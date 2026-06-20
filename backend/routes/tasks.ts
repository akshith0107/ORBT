import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';
import { analyzeTask } from '../services/aiService';

const router = express.Router();

router.use(authenticate);

// Get all tasks
router.get('/', async (req: AuthRequest, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user!.id },
      include: { subtasks: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create task
router.post('/', async (req: AuthRequest, res) => {
  const { title, description, dueDate } = req.body;
  
  try {
    // Fix 3.1: AI Service Crash - Move analyzeTask into try-catch
    const aiAnalysis = await analyzeTask(title, description, dueDate);

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: req.body.priority?.toUpperCase() || aiAnalysis.priority || 'MEDIUM', // Fix 3.3
        difficulty: aiAnalysis.difficulty || 'MEDIUM',
        estimatedHours: req.body.estimatedHours || aiAnalysis.estimatedHours || 1,
        completionProbability: aiAnalysis.completionProbability || 50,
        aiSummary: aiAnalysis.aiSummary || '',
        dueDate: (dueDate && !isNaN(Date.parse(dueDate))) ? new Date(dueDate) : null, // Fix 3.4
        userId: req.user!.id,
        subtasks: {
          // Fix 3.2: Defensive array mapping
          create: (Array.isArray(aiAnalysis?.subtasks) ? aiAnalysis.subtasks : []).map(t => ({ title: t }))
        }
      },
      include: { subtasks: true }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status or details
router.put('/:id', async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  // Fix 6.2: Mass Assignment - Destructure allowed fields
  const { title, description, priority, status, difficulty, dueDate, category } = req.body;
  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (category !== undefined) updateData.category = category;
  if (priority !== undefined) updateData.priority = priority.toUpperCase();
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (difficulty !== undefined) updateData.difficulty = difficulty.toUpperCase();
  
  if (dueDate) {
    const parsedDate = new Date(dueDate);
    if (!isNaN(parsedDate.getTime())) {
      updateData.dueDate = parsedDate;
    }
  }

  try {
    const task = await prisma.task.updateMany({
      where: { id, userId: req.user!.id },
      data: updateData,
    });
    if (task.count === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  try {
    const task = await prisma.task.deleteMany({
      where: { id, userId: req.user!.id },
    });
    if (task.count === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
