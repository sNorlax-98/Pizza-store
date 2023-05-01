const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongoURI =
  "mongodb+srv://snorlax-98:Anupam1234_@cluster0.sgrnwcn.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = mongoDB;
