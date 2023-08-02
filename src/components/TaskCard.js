import React from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle }) => {
  if(!task || task.length === 0) {
    return <p>Your bucket is empty</p>
  }
  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <div className="card-body">
          <div style={{ marginLeft: "167px" }}>
            <BiSolidEdit size={25} style={{ cursor: 'pointer' }} onClick={() => onEdit(task)} />{' '}
            <RiDeleteBinLine
              size={25}
              onClick={() => onDelete(task.id)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <h5 className="card-title">{task.name}</h5>
          <p className="card-text">{task.description}</p>
          <p className="card-text">
            <b>Due date:</b> {task.date}
          </p>
          <div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`flexSwitchCheckDefault-${task.id}`}
                checked={task.status === 'Completed'}
                onChange={() => onStatusToggle(task.id)}
              />
              <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${task.id}`}>
                {task.status === 'Completed' ? 'Completed' : 'Incomplete'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
