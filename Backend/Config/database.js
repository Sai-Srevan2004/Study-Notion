const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGO_URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
