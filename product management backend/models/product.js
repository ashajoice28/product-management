const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },

    image: {
      type: String,
      required: [true, "Image URL is required"],
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i,
        "Please enter a valid image URL",
      ],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Minimum rating is 0"],
      max: [5, "Maximum rating is 5"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);