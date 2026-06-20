import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = express.Router();

router.use(authenticate);

// 1. Smart Rescheduling Engine
// Fix 2.3: Use POST for state mutation
router.post('/reschedule', async (req: AuthRequest, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find overdue tasks
    const overdueTasks = await prisma.task.findMany({
      where: {
        userId: req.user!.id,
        status: { not: 'COMPLETED' },
        dueDate: { lt: today }
      }
    });

    const updates = overdueTasks.map(task => {
      const newDate = new Date(today);
      newDate.setDate(newDate.getDate() + 1); // Move to tomorrow by default
      const newCount = task.rescheduleCount + 1;
      
      let newPriority = task.priority;
      if (newCount >= 3) {
        if (newPriority === 'LOW') newPriority = 'MEDIUM';
        else if (newPriority === 'MEDIUM') newPriority = 'HIGH';
      }

      return prisma.task.update({
        where: { id: task.id },
        data: {
          dueDate: newDate,
          rescheduleCount: newCount,
          priority: newPriority,
          reschedules: {
            create: {
              oldDate: task.dueDate!,
              newDate: newDate,
              reason: 'Automatically rescheduled by AI Engine.'
            }
          }
        }
      });
    });

    // Fix 5.1: Use $transaction
    await prisma.$transaction(updates);
    const rescheduledIds = overdueTasks.map(t => t.id);

    res.json({ message: `Rescheduled ${rescheduledIds.length} tasks`, rescheduledIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Productivity Scoring & Advanced Analytics
router.get('/score', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    
    // Fix 5.2: Use DB aggregations instead of pulling full table
    const [totalTasks, completedTasks, rescheduledTasks, activeTasks] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.task.count({ where: { userId, rescheduleCount: { gt: 0 } } }),
      prisma.task.findMany({ where: { userId, status: { not: 'COMPLETED' } }, select: { estimatedHours: true } })
    ]);
    
    // Fetch habits with logs
    const habits = await prisma.habit.findMany({ where: { userId }, include: { logs: { orderBy: { date: 'desc' } } } });

    // Calculate Productivity Score (0-100)
    const taskCompletionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    
    const activeHabits = habits.length;
    
    // Fix 2.2: True consecutive day streak calculation
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const calculateStreak = (logs) => {
      if (logs.length === 0) return 0;
      let streak = 0;
      let checkDate = new Date(todayStr);
      
      // Check if logged today or yesterday, otherwise streak is 0
      const mostRecent = logs[0].date.toISOString().split('T')[0];
      if (mostRecent !== todayStr && mostRecent !== yesterdayStr) return 0;
      
      checkDate = new Date(mostRecent);
      for (const log of logs) {
        const logDateStr = log.date.toISOString().split('T')[0];
        const checkStr = checkDate.toISOString().split('T')[0];
        if (logDateStr === checkStr) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1); // move back one day
        } else if (logDateStr < checkStr) {
          break; // missed a day
        }
      }
      return streak;
    };

    const currentStreaks = habits.reduce((acc, h) => acc + calculateStreak(h.logs), 0);
    const habitCompletionRate = activeHabits ? (currentStreaks / activeHabits) * 100 : 0; // rough heuristic

    const overduePenalties = rescheduledTasks * 5; // 5% penalty per overdue
    
    // Fix 2.1: Proper clamping without || 85 falsy handling
    let rawScore = Math.round((taskCompletionRate * 0.4) + (habitCompletionRate * 0.5) - overduePenalties);
    let productivityScore = isNaN(rawScore) ? 85 : Math.max(0, Math.min(100, rawScore));

    // Calculate Burnout Detection
    const plannedHours = activeTasks.reduce((acc, t) => acc + (t.estimatedHours || 0), 0);
    const availableHours = 8;
    let burnoutRisk = 'LOW';
    if (plannedHours > availableHours * 1.5) burnoutRisk = 'HIGH';
    else if (plannedHours > availableHours) burnoutRisk = 'MEDIUM';

    // Fix 7.2: Dynamic Life Equilibrium
    const catScores = {};
    habits.forEach(h => {
      const c = h.category || 'General';
      if (!catScores[c]) catScores[c] = { total: 0, streak: 0 };
      catScores[c].total += 1;
      catScores[c].streak += calculateStreak(h.logs) > 0 ? 1 : 0;
    });

    const lifeEquilibrium = Object.keys(catScores).map(cat => ({
      category: cat,
      score: Math.round((catScores[cat].streak / catScores[cat].total) * 100) || 50
    }));

    if (lifeEquilibrium.length === 0) {
      lifeEquilibrium.push({ category: 'No Data', score: 0 });
    }

    res.json({
      productivityScore,
      burnoutRisk,
      plannedHours,
      availableHours,
      lifeEquilibrium
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
