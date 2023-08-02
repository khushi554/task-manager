import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete, onStatusToggle }) => {
  return (
    <div className="row p-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusToggle={onStatusToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
