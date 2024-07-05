import type { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import type { FormInput, Task } from '@/types/task';

interface HomeProps {
  initialTasks: Task[];
}

const Home: NextPage<HomeProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setCurrentTask(undefined);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setCurrentTask(undefined);
    setShowForm(false);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleSubmit: SubmitHandler<FormInput> = async (task) => {
    const method = task.id ? 'PUT' : 'POST';
    const response = await fetch(`/api/tasks/${task.id ?? ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      const updatedTask = await response.json();
      setTasks((prev) =>
        task.id
          ? prev.map((t) => (t.id === task.id ? updatedTask : t))
          : [...prev, updatedTask],
      );
      setShowForm(false);
    }
  };

  return (
    <main className="p-6">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-2"
        onClick={handleAddTask}
      >
        Add Task
      </button>
      {showForm && (
        <>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-3 mx-2"
            onClick={handleCloseForm}
          >
            Close
          </button>
          <TaskForm defaultValues={currentTask} onSubmit={handleSubmit} />
        </>
      )}
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
  const initialTasks = await res.json();
  return { props: { initialTasks } };
};

export default Home;
