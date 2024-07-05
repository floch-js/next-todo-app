import type { NextApiRequest, NextApiResponse } from 'next';
import { getTasks, addTask } from '@/utils/tasks';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const tasks = getTasks();
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title, category } = req.body;
    try {
      const newTask = addTask(title, category);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Error adding task' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
