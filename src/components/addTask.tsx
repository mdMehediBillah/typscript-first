import React, { useState } from 'react';
import { DiVim } from 'react-icons/di';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

const addTask = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn TypeScript', isCompleted: false },
    { id: 2, title: 'Learn React', isCompleted: false },
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        title: taskInput,
        isCompleted: false,
      },
    ]);
    setTaskInput('');
  };

  const handleEdit = (taskId: number, title: string) => {
    setIsEditing(taskId);
    setEditInput(title);
  };

  const handleEditSubmit = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: editInput } : task,
      ),
    );
    setIsEditing(null);
    setEditInput('');
  };

  const handleDelete = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <form
        onSubmit={handleAddTask}
        className="flex gap-2 items-center mt-4 max-w-[600px]"
      >
        <label htmlFor="taskInput" className="sr-only">
          Add task
        </label>
        <input
          id="taskInput"
          type="text"
          placeholder="Enter a new task"
          className="border-2 border-gray-300 rounded-md p-2 flex-grow focus:border-red-400 focus:outline-none"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      <ul className="mt-4 max-w-[600px] bg-slate-300 p-2 rounded-lg">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-2 mb-2 justify-between  bg-slate-100 p-2 rounded-lg"
          >
            {isEditing === task.id ? (
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-2 flex-grow focus:border-red-400 focus:outline-none"
                onBlur={() => handleEditSubmit(task.id)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleEditSubmit(task.id)
                }
              />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="cursor-pointer"
                  />
                  <p
                    className={`${
                      task.isCompleted ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center gap-1">
              {isEditing === task.id ? (
                <button
                  onClick={() => handleEditSubmit(task.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
              ) : (
                !task.isCompleted && (
                  <>
                    <FaRegEdit
                      onClick={() => handleEdit(task.id, task.title)}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                    />
                    <MdDeleteOutline
                      onClick={() => handleDelete(task.id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </>
                )
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default addTask;
