import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

// function login() {
//   const [eyeOpen, setEyeOpen] = useState(true);

//   const handleClick = () => {
//     setEyeOpen(!eyeOpen);
//   };

//   return (
//     <div className="bg-gray-200 h-screen flex justify-center items-center">
//       <motion.div
//         // initial={{ opacity: 0, scale: 0.5 }}
//         // animate={{ opacity: 1, scale: 1 }}
//         // transition={{ duration: 0.5 }}
//         className="max-w-md bg-white rounded-xl"
//       >
//         <h1 className="text-center text-2xl font-bold mb-4">Welcome Back</h1>

//         <form className="space-y-6 w-full">
//           <div classsName="flex gap-2">
//             <Mail className="text-gray-500"/>
//             <input 
//             type="email"
//              placeholder="Enter emaill"
//              className="focus:outline-none w-full border-b border-gray-200">
//              </input>
//           </div>

//           <div className="">
//             <Lock />
//             <input type={eyeOpen ? "password" : "text"} placeholder="Enter password"></input>
//             <div onClick={handleClick} className="">
//               {eyeOpen ? <Eye/> : <EyeOff />}
//             </div>
//           </div>
//         </form>

//         <Button variant="light">Login</Button>
//       </motion.div>
//     </div>
//   );
// }

// export default login;


function Login() {
  const [isEyeClick, setIsEyeClick] = useState(false);
  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick);
  };
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className = "max-w-md w-full rounded-2xl p-6 shadow-md bg-white"
      >
        <h1 className="text-center text-2xl font-bold mb-4">Welcome Back</h1>
        <form className="space-y-6 w-full">
          <div className="flex gap-2   ">
            <Mail className="text-gray-500" />
            <input
              type="email"
              className="focus:outline-none w-full border-b border-gray-200"
              placeholder="Enter Email..."
            />
          </div>
          <div className="flex gap-2 relative ">
            <Lock className="text-gray-500" />
            <div onClick={handleEyeClick} className="absolute right-2">
              {isEyeClick ? <EyeOff /> : <Eye />}
            </div>

            <input
              type={isEyeClick ? 'text' : 'password'}
              className="focus:outline-none w-full border-b border-gray-200"
              placeholder="Enter Password..."
            />
          </div>
          <div className="flex justify-center">
          <Button className="">Login</Button>
          </div>
          <p className="text-center">Dont have an account ? <Link to = "/register" className="text-blue-500 hover:underline">Register</Link></p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
