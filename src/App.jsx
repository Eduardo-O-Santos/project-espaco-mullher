import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Task } from './components/Task';

function App() {
  const [task, setTask] = useState({
    task: '',
    amount: 1,
  });
  const [taskList, setTaskList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('default');

  const randomId = crypto.randomUUID();

  useEffect(() => {
    const savedTasks = JSON.parse(window.localStorage.getItem('tasks'));
    if (savedTasks && Array.isArray(savedTasks)) {
      setTaskList(savedTasks);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: randomId,
      task: task.task,
      amount: task.amount,
      completed: false,
      createdAt: Date.now(),
    };

    setTaskList([...taskList, newTask]);

    // Limpa o campo de input
    setTask({ ...task, task: '' });

    window.localStorage.setItem(
      'tasks',
      JSON.stringify([...taskList, newTask]),
    );
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setTask({ ...task, [id]: value });
  }

  function removeTask(taskId) {
    setTaskList((t) => t.filter(({ id }) => id !== taskId));
    window.localStorage.setItem(
      'tasks',
      JSON.stringify(taskList.filter(({ id }) => id !== taskId)),
    );
  }

  function removeAllTasks() {
    setTaskList([]);
    window.localStorage.removeItem('tasks');
  }

  function handleSort({ target }) {
    if (target.value === 'default') {
      setTaskList((t) => [...t].sort((a, b) => b.createdAt - a.createdAt));
    }

    if (target.value === 'checked') {
      setTaskList((t) => [...t].filter(({ completed }) => completed));
    }

    if (target.value === 'alphabetical') {
      setTaskList((t) => [...t].sort((a, b) => a.task.localeCompare(b.task)));
    }
    setSelectedOption(target.value);
  }

  const handleToggleCompleted = (taskId) => {
    setTaskList((t) =>
      t.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((task) => task.completed).length;
  const percentage =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed() : 0;

  return (
    <>
      <div className="h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center bg-[#e5c3a7]">
          <form
            className="flex w-full justify-center items-center py-7 gap-2 bg-[#3f456e]"
            onSubmit={handleSubmit}
          >
            <label htmlFor="" className="text-white text-xl mr-2">
              O que você precisa guardar?
            </label>
            <input
              className="w-20 py-2 text-center text-white rounded-md bg-[#7d81ae] border"
              type="number"
              name="amount"
              id="amount"
              min="1"
              value={task.amount}
              onChange={handleChange}
            />
            <input
              className="py-2 px-2 rounded-md bg-[#7d81ae] text-white border"
              type="text"
              name="task"
              id="task"
              value={task.task}
              onChange={handleChange}
              placeholder="Alteres..."
              required
            />
            <button
              type="submit"
              className="py-2 px-5 rounded-md bg-[#ff6086] text-white text-md hover:bg-[#cf4e6c]"
            >
              Adicionar
            </button>
          </form>

          <section className="w-[960px] h-full p-10 flex flex-col justify-between">
            <ul className="grid grid-cols-3 gap-7">
              {taskList.length > 0 &&
                taskList.map(({ id, task, amount, completed }) => (
                  <Task
                    key={id}
                    id={id}
                    task={task}
                    amount={amount}
                    onRemoveTask={() => removeTask(id)}
                    completed={completed}
                    onToggleCompleted={handleToggleCompleted}
                  />
                ))}
            </ul>
            <section className="flex justify-center gap-5">
              <select
                name=""
                id=""
                className="py-2 px-3 rounded-md bg-[#3f456e] text-white outline-none hover:bg-[#4b5280]"
                value={selectedOption}
                onChange={handleSort}
              >
                <option value="default">Ordenar por mais recentes</option>
                <option value="checked">Mostrar guardados</option>
                <option value="alphabetical">Ordem alfabética</option>
              </select>
              <button
                className="py-2 px-3 rounded-md bg-[#ff854a] text-white hover:bg-[#be714a]"
                onClick={removeAllTasks}
              >
                Limpar lista
              </button>
            </section>
          </section>
        </main>
        <footer className="flex justify-center items-center py-7 gap-2 bg-[#3f456e]">
          <p className="text-white text-lg">
            {`Você tem ${totalTasks} items na lista`}
            {completedTasks > 0 &&
              ` e ja guardou  ${completedTasks} de (${percentage}%)`}
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
