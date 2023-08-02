import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import TaskList from '../components/TaskList';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [taskEdit, setTaskEdit] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem('taskList')) || [];
    setTaskList(savedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const toggle = (task = null) => {
    setTaskEdit(task ? { ...task } : null);
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    if (taskEdit) {
      const updatedTaskList = taskList.map((task) => (task.id === taskEdit.id ? taskObj : task));
      setTaskList(updatedTaskList);
      setTaskEdit(null);
    } else {
      const newTask = { ...taskObj, id: uuidv4(), status: 'Incomplete'};
      setTaskList([...taskList, newTask]);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
  };

  const handleStatusToggle = (taskId) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: task.status === 'Completed' ? 'Incomplete' : 'Completed' } : task
    );
    setTaskList(updatedTaskList);
  };

  return (
    <>
      <div className="header text-center">
        <h3>TODO LIST</h3>
        <button className="btn btn-primary mt-2" onClick={() => toggle()}>
          Create Task
        </button>
      </div>
      {taskList.length === 0 && <p className="text-center" style={{color: 'gray',marginTop: '34px',fontSize: '139%'}}>Your bucket is empty</p>}
      <TaskList
        tasks={taskList}
        onEdit={toggle}
        onDelete={handleDeleteTask}
        onStatusToggle={handleStatusToggle}
      />

      <CreateTask
        modal={modal}
        toggle={toggle}
        save={saveTask}
        setModal={setModal}
        taskEdit={taskEdit}
        handleStatusToggle={handleStatusToggle}
      />
    </>
  );
};

export default TodoList;
