// import jwt from 'jsonwebtoken'; 

// export const tokenMw  = (req,res,next) => {
    
//     // req.headers me se token nikalna hai
//     const token = req.cookies.token;
//     // console.log(`Token => ${token}`)

//     // Agar token nahi mila toh user authenticated nahi hai
//     if(!token) {
//         return res.status(401).json({
//             authenticated : false,
//             message: "User not authenticated"
//         })
//     };

//     // Agar token mil gaya hai toh usko verify karna hai
//     const decoded = jwt.verify(token , "This is secret key");
//     // console.log(`4.) Decoded token: ${decoded}`)

//     // req me user ki information attach kar dena hai
//     req.user = decoded;
//     // console.log(`req.user => ${req.user}`)

//     // console.log("5.) verification middleware is running")
//     next();
// };


// Is middleware ka sirf itna kaam hai , ki ye request/headers me se token ko nikal raha hai
// or us token ko server ne jo token generate kara hai us se compare karana.

// verifyToken.js
import jwt from "jsonwebtoken";
import redisClient from "../Redis/redisServer.js";

export const tokenMw = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify signature and get payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "This is secret key");
    req.user = decoded; // attach payload to request
    console.log(req.user)

    // Now check Redis: whether token exists / matches stored value
    // We used key `token:<userId>` when saving
    const redisKey = `token:${req.user.id}`; // ensure payload contains id
    console.log(`Redis-Key : ${redisKey}`)
    const storedToken = await redisClient.get(redisKey);
    console.log(`Stored-Token : ${storedToken}`)

    if (!storedToken) {
      return res.status(401).json({ message: "Session expired or logged out" });
    }

    if (storedToken !== token) {
      return res.status(401).json({ message: "Token mismatch — please login again" });
    }
``
    // All good
    next();
  } catch (err) {
    console.error("Token middleware error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};



// Logout function
// authController.js (add)
// export const logout = async (req, res) => {
//   try {
//     const token = req.cookies?.token;
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || "This is secret key");
//         const redisKey = `token:${decoded.id}`;
//         await redisClient.del(redisKey);
//       } catch (e) {
//         // token might be invalid/expired; still clear cookie
//       }
//     }

//     res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
//     return res.status(200).json({ message: "Logged out" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };








