const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./model/Food');
const cors = require('cors');
const app = express();

//use
app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://mohdfarhan2408:khan1998@cluster0.o8k9y.mongodb.net/food-crud?retryWrites=true&w=majority",{useNewUrlParser: true});

//GET
app.get('/read', (req,res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        }

        res.json(result)
    })
});


//POST  
app.post('/insert', async (req,res) => {

    const food = new FoodModel({
        foodName: req.body.foodName,
        lastDays: req.body.lastDays
    });

    try {
        await food.save(); //save into dbs
        res.json(food)
    } catch(err) {
        res.json(err)
    }
    
});



//PUT (method 2), using middleware, my preference;
app.put('/:id', getFoodId , async (req,res) => {
    if (req.body.newFoodName) {
        res.food.foodName = req.body.newFoodName;
      } 

    if (req.body.newDays != null) {
        res.food.lastDays = req.body.newDays
    } 

    try {
      const updatedFood = await res.food.save() //save into db
      res.json(updatedFood)
    } catch (err) {
      res.json(err)
    }
})


//DELETE (method 2), using middleware, my preference;
app.delete('/:id', getFoodId , async (req,res) => {
    try {
        await res.food.remove()
        res.json({ message: 'Deleted Food' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware, get the food list by their id;
async function getFoodId(req, res, next) {
    let food;
    try {
      food = await FoodModel.findById(req.params.id) //findbyid is a mongoose syntax
      if (food == null) {
        return res.status(404).json({ message: 'Cannot find food' }) // reason use RETURN is because if  no food, we want immediately leave the fx
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    
    // return all data for users that have an id.
    res.food = food // pass this to all /:id route.
    next()
  }


app.listen(3000, () => console.log('server run'));


//PUT (method 1); (update food name)
// app.put('/update', async (req,res) => {
//     const newFoodName = req.body.newFoodName;
//     // const newDays = req.body.newDays;
//     const id = req.body.id;

//     try {
//         await FoodModel.findById(id, (err, updatedFood) => {
//             updatedFood.foodName = newFoodName; //newFoodName is presented as foodName.
//             updatedFood.save();
//             res.send('done');
//         })

//         // await FoodModel.findById(id, (err, updatedDays) => {
//         //     updatedDays.lastDays = newDays; //newFoodName is presented as foodName.
//         //     updatedDays.save();
//         //     res.send('done');
//         // })

//     } catch (err) {
//         console.log(err)
//     }
// })

//DELETE (method 1);
// app.delete('/remove/:id', async (req,res) => {
//     const id = req.params.id;

//     await FoodModel.findByIdAndRemove(id).exec(); //find the foodmodel by it's id and then remove it from db.
//     res.send('Deleted')
// })