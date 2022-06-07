import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './AddTable.css';

export const AddTable = ({ table, createTable, addRow }) => {
  const [m, createM] = useState('');
  const [n, createN] = useState('');

  return (
    <div
      className="addTable mar"
    >
      <div
        className="addTable block"
      >
        <h1 className="addTable head">Введіть кількість колонок (1-10): </h1>
        <input
          className="addTable inp"
          type="number"
          max="10"
          min="1"
          value={m}
          onChange={event => createM(event.target.value)}
          placeholder="M"
        />

        <h1 className="addTable head">Введіть кількість строчок (1-10): </h1>
        <input
          className="addTable inp marB"
          type="number"
          max="10"
          min="1"
          value={n}
          onChange={event => createN(event.target.value)}
          placeholder="N"
        />
      </div>

    <div className='d-grid gap-2 col-6 mx-auto mar'>
    <button
        type="btn btn-dark btn-primary"
        className="addTable btn btn-dark btn-primary"
        onClick={() => createTable(m, n)}
      >
        Створити
      </button>

    </div>
     
      <button
        type="btn btn-dark btn-primary "
        className={table.length > 0
          ? `btn btn-dark btn-primary mar `
          : `btn btn-dark btn-primary noneDis`}
        onClick={() => addRow(m)}
      >
        Додати стрічку
      </button>
    </div>
  );
};

AddTable.propTypes = {
    table: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.object),
    ).isRequired,
    createTable: PropTypes.func.isRequired,
    addRow: PropTypes.func.isRequired,
  };

