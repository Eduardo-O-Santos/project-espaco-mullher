import { RiDeleteBinLine } from 'react-icons/ri';

function Task({
  id,
  amount,
  task,
  onRemoveTask,
  completed,
  onToggleCompleted,
}) {
  function handleToggle() {
    onToggleCompleted(id);
  }

  return (
    <li className="flex gap-1 py-2 px-3 justify-between items-center bg-gray-100 rounded-md shadow-md">
      <input
        type="checkbox"
        name="completed"
        id={`completed-${id}`}
        checked={completed}
        onChange={handleToggle}
      />
      <span htmlFor="" className={completed ? 'line-through' : ''}>
        {amount} {task}
      </span>
      <span
        className="bg-white p-1 rounded-full shadow-lg hover:bg-gray-200 text-gray-500 cursor-pointer"
        onClick={onRemoveTask}
      >
        <RiDeleteBinLine size={22} />
      </span>
    </li>
  );
}

export { Task };
