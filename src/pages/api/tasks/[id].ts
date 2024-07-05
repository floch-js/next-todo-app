import type { NextApiRequest, NextApiResponse } from 'next';
import { getTasks, updateTask, deleteTask } from '@/utils/tasks';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  const taskId = parseInt(id as string);

  switch (method) {
    case 'GET':
      const tasks = getTasks();
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
      break;
    case 'PUT':
      const { title, category } = req.body;
      const updatedTask = updateTask(taskId, title, category);
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
      break;
    case 'DELETE':
      const success = deleteTask(taskId);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
