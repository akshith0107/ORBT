import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = express.Router();

router.use(authenticate);

// Get all habits
router.get('/', async (req: AuthRequest, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.user!.id },
      include: { logs: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create habit
router.post('/', async (req: AuthRequest, res) => {
  const { name, category, frequency } = req.body;
  try {
    const habit = await prisma.habit.create({
      data: {
        name,
        category,
        frequency: frequency?.toUpperCase() || 'DAILY',
        userId: req.user!.id,
      },
    });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update habit
router.put('/:id', async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  // Fix 6.2: Mass Assignment - Destructure allowed fields
  const { name, category, frequency } = req.body;
  const updateData: any = {};
  if (name) updateData.name = name;
  if (category) updateData.category = category;
  if (frequency) updateData.frequency = frequency.toUpperCase();

  try {
    const habit = await prisma.habit.updateMany({
      where: { id, userId: req.user!.id },
      data: updateData,
    });
    if (habit.count === 0) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete habit
router.delete('/:id', async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  try {
    // Fix 6.1: IDOR Vulnerability - Check ownership first
    const habitCheck = await prisma.habit.findFirst({ where: { id, userId: req.user!.id } });
    if (!habitCheck) return res.status(404).json({ message: 'Habit not found' });

    // Delete associated logs first
    await prisma.habitLog.deleteMany({ where: { habitId: id } });
    
    const habit = await prisma.habit.delete({
      where: { id },
    });
    if (habit.count === 0) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark Habit Complete for a specific date
router.post('/:id/log', async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  const { date } = req.body; // e.g., "2023-10-01"
  
  try {
    const habit = await prisma.habit.findFirst({ where: { id, userId: req.user!.id } });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    // Fix 2.4: Server local timezone date shift bug
    const [year, month, day] = date.split('-').map(Number);
    const logDate = new Date(Date.UTC(year, month - 1, day));

    const log = await prisma.habitLog.upsert({
      where: { habitId_date: { habitId: id, date: logDate } },
      update: { completed: true },
      create: { habitId: id, date: logDate, completed: true }
    });

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
