import type { Task } from '@/types/task';

let tasks: Task[] = [
  { id: 1, title: 'Finish the report', category: 'Work' },
  { id: 2, title: 'Grocery shopping', category: 'Personal' },
  { id: 3, title: 'Renew car insurance', category: 'Test' },
];

export function getTasks(): Task[] {
  return tasks;
}

export function addTask(title: string, category: string): Task {
  const newTask: Task = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title,
    category,
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(
  id: number,
  title: string,
  category: string,
): Task | undefined {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return undefined;
  }
  const updatedTask = { ...tasks[taskIndex], title, category };
  tasks[taskIndex] = updatedTask;
  return updatedTask;
}

export function deleteTask(id: number): boolean {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length !== initialLength;
}
