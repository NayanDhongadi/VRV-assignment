const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userdb = require('../models/userSchema');


//  Basic route for testing

router.get('/', (req, res) => {
  res.send('Welcome to My Assignment')
})



//  for user registration

// router.post('/api/signup', async (req, res) => {
//   const { password, username } = req.body

//   if (!password || !username) {
//     res.status(400).json({ error: "Fill all the details" })
//   }

//   try {


//     const existingUser = await userdb.findOne({ username });

//     if (existingUser) {
//       return res.status(409).json({ message: "username already exists" });

//     }


//     const finaluser = new userdb({
//       password, username
//     })


//     const storeData = await finaluser.save();

//     return res.status(201).json(storeData)

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ error: "Internal server error" });
//   }


// })





const SECRET_KEY = "Nayan-Dhongadi"; // Replace with an environment variable for production

router.post('/api/signup', async (req, res) => {
  const { username, password ,role } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: "Please fill all the required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await userdb.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creating new user
    const newUser = new userdb({
      username,
      password: hashedPassword,
      role:role
    });

    // Save the user in the database
    const savedUser = await newUser.save();

    // Generate a JWT for the user
    const token = jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      SECRET_KEY,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send success response with token
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});







// for user login
// router.post('/api/login', async (req, res) => {
//   // console.log(req.body);

//   const { username, password } = req.body;

//   try {
//     const userValid = await userdb.findOne({ username });

//     if (userValid) {
//       const isMatch = await bcrypt.compare(password, userValid.password);

//       if (!isMatch) {
//         res.status(401).json({ status: 401, error: "Invalid Credentials" });
//       } else {
//         // Generate token
//         const token = await userValid.generateAuthtoken();
//         // Return the token in the response
//         res.status(200).json({ status: 200, result: { token } });
//       }
//     } else {
//       // User not found
//       res.status(404).json({ status: 404, error: "User not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: 500, error: "Internal Server Error" });
//   }
// });



router.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ status: 400, error: "Please provide all required fields (username, password, role)" });
  }

  try {
    // Find user by username and role
    const userValid = await userdb.findOne({ username, role });

    if (userValid) {
      // Verify password
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        return res.status(401).json({ status: 401, error: "Invalid Credentials" });
      } else {
        // Generate a new token
        const token = await userValid.generateAuthtoken();

        // Include user information and token in the response
        return res.status(200).json({ 
          status: 200, 
          result: { 
            token,
            user: {
              username: userValid.username,
              role: userValid.role
            } 
          } 
        });
      }
    } else {
      // User not found or role mismatch
      return res.status(404).json({ status: 404, error: "Invalid username or role" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});











module.exports = router;