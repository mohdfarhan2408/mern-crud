const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema ({
    foodName: {
        type: String,
        required: true,
    },
    lastDays: {
        type: Number,
        required: true,
    }
});

const Food = mongoose.model("foods", FoodSchema);
module.exports = Food;

