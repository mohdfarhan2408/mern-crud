import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios'; //connect to backends

function App() {
  const [foodList, setFoodList] = useState([]); //list of food
  const [foodName, setFoodName] =useState(''); 
  const [days, setDays] = useState(0); //default 0 as our data type is number.
  const [newFoodName, setNewFoodName] = useState(''); //updated food name
  const [newDays, setNewDays] = useState(); //if set to 0, the days field will change to 0 if we leave the newDays field.


  useEffect(() => {
    Axios.get('http://localhost:3000/read').then(res => {
      setFoodList(res.data)
    })
  }, [])

  //add to list
  const addToList = () => {
    Axios.post('http://localhost:3000/insert', {
      foodName: foodName,
      lastDays: days,
    })
    .then(res => setFoodList(
      [...foodList,
        {
          foodName, 
          days, //useState
        }
      ]
    ))
  }

  //Method (1)
  // //update food name/using PUT;
  // const updateFood = (id) => {
  //   Axios.put('http://localhost:3000/update', {
  //     id:id,
  //     newFoodName: newFoodName,
  //     // newDays: newDays,
  //   })
  // }



  // //remove list;
  // const removeFood = (id) => {
  //   Axios.delete(`http://localhost:3000/remove/${id}`)
  // }


   //Method (1), preference;
  //update food name/using PUT;
  const updateFood = (id) => {
    Axios.put(`http://localhost:3000/${id}`, {
      newFoodName: newFoodName,
      newDays: newDays,
    })
  }


  //remove list;
  const removeFood = (id) => {
    Axios.delete(`http://localhost:3000/${id}`)
  }



  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food Name:</label>
      <input 
        type='text'
        onChange={(e) => setFoodName(e.target.value)}
        />
      <label>Days Since You Ate It:</label>
      <input 
        type='number'
        onChange={(e) => setDays(e.target.value)}
        />
      <button onClick={addToList}>Add to list</button>

      <h1>Food List: </h1>

      {foodList.map((value, index) => {
        return (
          <div className='food' key={index}>
            <h1>{value.foodName}</h1> 
            <h1>{value.lastDays}</h1> 
            <input 
              type='text' 
              placeholder='Update name..' 
              onChange={(e) => setNewFoodName(e.target.value)}
              />
            <input 
            type='text' 
            placeholder='Update days..' 
            onChange={(e) => setNewDays(e.target.value)}
            />
            <button onClick={() => updateFood(value._id)}>Update</button> {/*_id is taken from mongoose*/}
            <div><button onClick={() => removeFood(value._id)}>Delete</button></div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
