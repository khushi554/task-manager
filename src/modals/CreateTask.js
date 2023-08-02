import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({ modal, toggle, save, setModal, taskEdit, handleStatusToggle }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskNameError, setTaskNameError] = useState(null);
  const [taskDescriptionError, setTaskDescriptionError] = useState(null);
  const [taskDateError, setTaskDateError] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    if (taskEdit) {
      setTaskName(taskEdit.name || '');
      setTaskDescription(taskEdit.description || '');
      setTaskDate(taskEdit.date || '');
      setEditedTask(taskEdit);
    } else {
      setTaskName('');
      setTaskDescription('');
      setTaskDate('');
      setEditedTask(null);
    }
  }, [taskEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    if (name === 'taskName') {
      setTaskName(value);
      setTaskNameError(null);
    } else if (name === 'taskDescription') {
      setTaskDescription(value);
      setTaskDescriptionError(null);
    } else if (name === 'taskDate') {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate <= currentDate) {
        setTaskDateError('Due date cannot be in the past');
      } else {
        setTaskDateError(null);
      }
      setTaskDate(value);
    }
  };

  const handleSave = () => {
    if (!taskName) {
      setTaskNameError('Please enter a task name');
    } else {
      setTaskNameError(null);
    }

    if (!taskDescription) {
      setTaskDescriptionError('Please enter a task description');
    } else {
      setTaskDescriptionError(null);
    }

    if (!taskDate) {
      setTaskDateError('Please select a due date');
    } else {
      setTaskDateError(null);
    }

    if (taskName && taskDescription && taskDate && !taskDateError) {
      const taskObj = {
        name: taskName,
        description: taskDescription,
        date: taskDate,
      };

      if (editedTask) {
        save({ ...editedTask, ...taskObj });
      } else {
        save(taskObj);
      }

      handleCancel();
      setModal(false);
    }
  };

  const handleCancel = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    setTaskNameError(null);
    setTaskDescriptionError(null);
    setTaskDateError(null);
    setModal(false);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} onClosed={handleCancel}>
        <ModalHeader toggle={toggle}>
          {taskEdit ? "Update task" : "Create task"}
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label htmlFor="taskName">Task title</label>
              <input
                type="text"
                className="form-control"
                name="taskName"
                value={taskName}
                onChange={handleChange}
              />
              {taskNameError && <div className="text-danger">{taskNameError}</div>}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="taskDescription">Task description</label>
              <textarea
                rows={3}
                className="form-control"
                name="taskDescription"
                value={taskDescription}
                onChange={handleChange}
              />
              {taskDescriptionError && <div className="text-danger">{taskDescriptionError}</div>}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="taskDate">Due date</label>
              <input
                type="date"
                className="form-control"
                name="taskDate"
                value={taskDate}
                onChange={handleChange}
              />
              {taskDateError && <div className="text-danger">{taskDateError}</div>}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave} disabled={taskNameError || taskDescriptionError || taskDateError}>
            {taskEdit ? "Update" : "Create"}
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTask;

