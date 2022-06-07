import React, { useState, useEffect } from 'react';
import './App.css';
import { AddTable } from './components/AddTable/AddTable';
import { ShowTable } from './components/ShowTable/ShowTable';

function App() {
  const [table, setTable] = useState([]);
  const [average, setAverage] = useState([]);

  const createTable = (m, n) => {
    const newTable = [];
    let id = 0;

    for(let i = 0; i < n; i += 1) {
      const row = []
      for (let j = 0; j < m; j += 1) {
        let amount = Math.floor(Math.random() * 1000);

        if(amount < 100) {
          amount += 100;
        }
  
        row.push({
          amount,
          procent: 0,
          id,
          hover: false,
          showProcent: false,
        })
        
        id += 1  
      }

      newTable.push(row)
    }
    procentCalc(newTable)
  }

  const addRow = (m) => {
    const newTable = [...table];

    const row = [];
    let id = table[table.length - 1][m - 1].id + 1

    for(let i = 0; i < m; i += 1) {
      let amount = Math.floor(Math.random() * 1000);

      if(amount < 100) {
        amount += 100
      }
      row.push({
        ...table[0][0],
        amount,
        id
      })
      
      id += 1
    }

    newTable.push(row)

    procentCalc(newTable)
  }

  const amountClick = (e) => {
    const id = e.target.value;

    const newTable = [...table]
    
    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        if (+newTable[i][j].id === +id) {
          newTable[i][j].amount += 1;
        }
      }
    }


    procentCalc(newTable)
  }

  const removeRow = (e) => {
    const tableMinusRow = [...table]

    tableMinusRow.splice(e.target.value, 1); 
      setTable(tableMinusRow);
    
  }

  const hoverAmount = (e) => {
    const newTable = [...table]

    const hoverArr = []

    newTable.forEach(row => row.forEach(num => hoverArr.push(+num.amount)));

    hoverArr.sort((a, b) =>  a - b)
    const index = hoverArr.indexOf(+e.target.innerText)
    
    const a = hoverArr[index + 1]
    const b = hoverArr[index - 1]

    for(let i = 0; i < newTable.length; i += 1) {
      for(let j =0; j < newTable[i].length; j += 1) {
        if (+newTable[i][j].amount === a
          || +newTable[i][j].amount === b) {
          newTable[i][j].hover = true;
        }
      }
    }

    setTable(newTable)
  }

  const stopHoverAmount = () => {
    const newTable = [...table]

    for( let i = 0; i < newTable.length; i += 1) {
      for(let j =0; j < newTable.length; j += 1) {
        newTable[i][j].hover = false
      }
    }

    setTable(newTable)
  }

  useEffect(() => {
    if(table.length > 0) {
      const newAverage = []

      for(let i = 0; i < table[0].length; i += 1 ) {
        const a = table.reduce((acc, current) => acc + current[i].amount, 0)

        newAverage.push((a / table.length).toFixed(1))
      }
      setAverage(newAverage)
    }
  }, [table]);

  function procentCalc(newTab) {
    const newTable = [...newTab];

    for (let i = 0; i < newTable.length; i += 1) {
      const sum = newTab[i].reduce((acc, num) => acc + (+num.amount), 0);

      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].procent
          = (+newTable[i][j].amount / sum * 100).toFixed(1);
      }
    }

    setTable(newTable)
  }

  const showProcent = (e) => {
    const newTable = [...table]
    const i = e.target.id

    for ( let j = 0; j < newTable[i].length; j += 1) {
      newTable[i][j].showProcent = true;
    }

    setTable(newTable)
  }

  const stopShowProcent = () => {
    const newTable = [...table]

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].showProcent = false;
        
      }
    }

    setTable(newTable)
  }


  return (
    <>
      <AddTable 
         createTable={createTable}
         addRow={addRow}
         table={table}
         />

      <ShowTable table={table}
        average={average}
        amountClick={amountClick}
        removeRow={removeRow}
        hoverAmount={hoverAmount}
        stopHoverAmount={stopHoverAmount}
        showProcent={showProcent}
        stopShowProcent={stopShowProcent}/>
    </>
  );
}

export default App;
