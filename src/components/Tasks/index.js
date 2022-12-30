import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import './Tasks.css';

export default function Tasks({ tasks, index, handleEdit, handleDelete }) {
  return (
    <ul className="tasks">
      {tasks.map((task, mapIndex) => (
        <li key={task} className={index === mapIndex ? 'beingEdited' : ''}>
          {task}
          <span>
            <FaEdit onClick={(e) => handleEdit(e, mapIndex)} className="edit" />
            <FaWindowClose
              onClick={(e) => handleDelete(e, mapIndex)}
              className="delete"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
