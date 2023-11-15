const mongoose = require('mongoose');

let dbConnection;

// MongoDB Atlas connection string with the 'Tut' database
const uri = 'mongodb+srv://z242jian:Ruian_2018@carpool.ory0mtx.mongodb.net/Tut?retryWrites=true&w=majority';

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
