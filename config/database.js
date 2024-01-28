const mongoose = require('mongoose');

let dbConnection;

// MongoDB Atlas connection string with the 'Tut' database
const uri = process.env.MONGODB_URI.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);
module.exports = {
  connectToDb: async (cb) => {
    try {
      await mongoose.connect(uri);
      dbConnection = mongoose.connection;
      return cb();
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  },

  getDb: () => dbConnection
};
