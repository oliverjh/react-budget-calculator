import React, {useState, useEffect} from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

// const initialExpenses = [
//   {
//     id: uuid(),
//     charge: "Rent",
//     amount: 500,
//   },
//   {
//     id: uuid(),
//     charge: "Car",
//     amount: 1200,
//   },
//   {
//     id: uuid(),
//     charge: "Insurance",
//     amount: 45,
//   }
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  // **** state value **** //
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  //single expense
  const [charge, setCharge] = useState('');

  //single amount
  const [amount, setAmount] = useState('');

  //alert
  const [alert, setAlert] = useState({show: false});

  //edit
  const [edit, setEdit] = useState(false);

  //edit item
  const [id, setId] = useState(0);

  // **** useEffect **** //
  //only call useEffect when there are changes in the state
  useEffect(() => {
    console.log('useEffect was called');
    //Expenses array that is passed in comes from state
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // **** functionality *** //
  //handle charge
  const handleCharge = e => {
    console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  }

  //handle amount
  const handleAmount = e => {
    console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  }

  //handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});

    //Hide the alert again after 3 seconds
    setTimeout(() => {
      setAlert({show: false})
    }, 3000);
  }

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if(edit) {
      //if we are editing an existing item
      let tempExpenses = expenses.map(item => {
        //return the item in a let with the updates charge and amount (ES6)
        return item.id === id ? {...item, charge, amount} : item
      });
      setExpenses(tempExpenses);
      setEdit(false);
      handleAlert({type: 'success', text: 'item succesfully updated'});
      } else {
        //Creates a new expense
        const singleExpense = { id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: 'success', text: 'item succesfully added'});
      }
      //Remove data from the input fields after submit
      setAmount('');
      setCharge('');
    } else {
      //handle alert
      handleAlert({type: 'danger', text: `please ensure both charge and amount fields are populated`})
    }
  }

  //Clear all items
  //Pass in empty array to clear all items
  const clearItems = () => {
    console.log('Clear all items');
    setExpenses([]);
    handleAlert({type: 'danger', text:'all items deleted'});   
  }

  //Handle delete single item
  const handleDelete = (id) => {
    console.log(`item deleted: ${id}`);

    //create variable with all items apart from deleted id
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: 'danger', text:'item deleted'});   
  }

  //Handle edit single item
  const handleEdit = (id) => {
    //Create expense variable for the selected expense item
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;

    //Set field values and button text to edit
    setCharge(charge);
    setAmount(amount);
    setEdit(true);

    setId(id);
  }

  return (
    <>
    {alert.show &&
      <Alert type={alert.type} text={alert.text} />
    }
      <h1>Budget Calculator</h1>
      <main className="App">
        <Form 
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          clearItems={clearItems} 
        />
      </main>
      <h1>
        Total Spending:
        <span className="total" >£{expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}</span> 
      </h1>
    </>
  );
}

export default App;
