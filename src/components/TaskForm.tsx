import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { FormInput } from '@/types/task';

interface TaskFormProps {
  defaultValues?: FormInput;
  onSubmit: SubmitHandler<FormInput>;
}

const TaskForm = ({ defaultValues, onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
        />
        {errors.title && (
          <span className="text-red-500 text-xs italic">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Category
        </label>
        <input
          type="text"
          {...register('category', { required: 'Category is required' })}
          className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
        />
        {errors.category && (
          <span className="text-red-500 text-xs italic">
            {errors.category.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
