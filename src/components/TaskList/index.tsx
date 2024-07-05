import type { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList = ({ tasks, onDelete, onEdit }: TaskListProps) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold text-gray-700 my-4">Tasks List</h1>
      <div>
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
