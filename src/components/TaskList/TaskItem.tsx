import type { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem = ({ task, onDelete, onEdit }: TaskItemProps) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
      <div>
        <p className="text-gray-700 text-base">{task.title}</p>
        <p className="text-gray-500 text-xs">{task.category}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
