const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');



const SECRET_KEY = "Nayan-Dhongadi"; 





const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      name: ['Admin', 'User', 'Moderator'], 
      default: 'User', 
    },
  }, { timestamps: true }); 



  userSchema.methods.generateAuthtoken = async function () {
    try {
      const token = jwt.sign(
        { _id: this._id, role: this.role },
        SECRET_KEY,
        { expiresIn: '1h' } 
      );
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Token generation failed');
    }
  };


const userdb = mongoose.model("users", userSchema)

module.exports = userdb;