import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';
import { analyzeHabits } from '../services/aiService';

const router = express.Router();

router.use(authenticate);

// Get AI Insights
router.get('/insights', async (req: AuthRequest, res) => {
  try {
    const insights = await prisma.aIInsight.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    if (insights.length === 0) {
      // Mock generated insight if none exist
      return res.json([{
        title: 'High Consistency',
        description: 'You complete more tasks on Tuesdays. Keep it up!',
        type: 'PRODUCTIVITY'
      }]);
    }
    
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Habit Coach
router.get('/habit-coach', async (req: AuthRequest, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.user!.id },
      include: { logs: true }
    });
    
    // Fix 5.4: Pre-aggregate summary instead of sending entire db to LLM
    const aggregatedHabits = habits.map(h => ({
      name: h.name,
      category: h.category,
      frequency: h.frequency,
      totalLogs: h.logs.length,
      recentLogs: h.logs.filter(l => l.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
    }));
    
    const analysis = await analyzeHabits(aggregatedHabits as any);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
