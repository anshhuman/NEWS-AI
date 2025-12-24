import User from "../Model/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redisClient from "../Redis/redisServer.js";

// Controller for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(`Email : ${email}`)
    // console.log(`1.) User found: ${user}`)
    // console.log(user.name , user.email , user.password , user.id)

    // Check if user is registered or not
    if (!user) {
      return res.status(404).json({
        message: "Sorry , you are not registered",
      });
    }

    // If user is registered , check and compare the password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({
        message: "Password not matched",
      });
    } else {
      // If user passes both the steps , then generate the token
      const payload = {
        id: user._id,
        user: user.name,
        email: email,
      };

      const token = jwt.sign(payload, "This is secret key", {
        expiresIn: "1D",
      });
      console.log(`2.) Generated token:  ${token}`);

      // Set the token in Browser/Storage/Cookie with the name "token"
      // Server on hone ke baad jab browser -> Client ko request bhejega toh Cookie Response.headers ke Set-Cookie
      // me jaake save hogi.
      // Fir jab Browser dobara se Server ko request bhejega toh Cookie request.headers ke andar jaake token me save hojayegi.
      res.cookie("token", token, {
        httpOnly: true, // Meaning => Frontend se is token(cookie) ko user access nahi kar skta . For ex => "document.cookie"
      });

      // Save token to redis
      const redisKey = `User-ID:${user._id.toString()}`;
      console.log(`User-ID on Redis : ${redisKey}`);
      const expirySeconds = 24 * 60 * 60; // 1 day (match jwt expiry)
      await redisClient.set(redisKey, token, { EX: expirySeconds });
      // console.log(`User email ${user.email}`)
      res.status(200).json({
        message: "login successfully",
        token: token,
        email: email,
        preferences : user.preferences
      });
    }
  } catch (error) {}
};


// This controller is the last one to work , if all things are fine till now. 
export const verify = async (req, res) => {
  // console.log('verify wali', req.user);
  if (!req.user) {
  } else {
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.user,
      email: req.user.email
    });
  }
};

// Controller for register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    // Check if user already exists
    if (checkUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    console.log(`Hashed password: ${hashPassword}`);

    // Create a new user
    const newUser = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      data: newUser,
      message: "User Registered successfully",
    });
  } catch (error) {}
};

// How to use bcrypt library

// 1.) Import this library
// 2.) In the register controller , take the password out from the req.body and generate a hash
//     like this , bcrypt.hash(password,12) , here 12 is the salt round used for making the pass
//     word stronger.
// 3) After bcrypt the password , save it in the password key
// 4) In login controller , if the user exists then compare the password by using bcrypt.compare().
// 5) There are two stages in login authentication. First is , check the user mail ID and password.
//    If the user passes both the stages then the last stage is token generation.
// 6) Generate token using JWT and save the token in the cookie.
