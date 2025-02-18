const mongoose = require("mongoose");

// Define the schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

// Use existing model if already defined
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
