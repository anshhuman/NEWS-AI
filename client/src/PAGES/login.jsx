import React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'; 
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector , useDispatch} from 'react-redux';
import {SignIn} from '../redux/slice/authSlice';

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

  const dispatch = useDispatch();
  const [isEyeClick, setIsEyeClick] = useState(false);

  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick);
  };

  // Login form validation schema
  const LoginSchema = z.object({
    email : z.string()
            .min(1,"Email is required")
          .refine((email) => email.includes("@"), {
            message : "Email address must contain '@'."
          })
          .refine((email) => email.includes("."), {
            message : "Email address must contain '.'"
          })
          .refine((email) => email.toLowerCase().endsWith("com"), {
            message : "Email address must ends with 'com'."
          })
          .transform((email) => email.toLowerCase()),
    password :  z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password cannot exceed 32 characters" })
      .refine(password => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter"
      })
      .refine(password => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter"
      })
      .refine(password => /\d/.test(password), {
        message: "Password must contain at least one number"
      })
      .refine(password => /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`]/.test(password), {
        message: "Password must contain at least one special character"
      })
     });

  const {register , handleSubmit , reset , formState : {errors}} = useForm({
    resolver : zodResolver(LoginSchema)
  });

  const onSubmit = (data) => {
    console.log(data)
    // reset();
    dispatch(SignIn(data));
  };

  console.log(errors);
  // Login form validation schema


  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className = "max-w-md w-full rounded-2xl p-6 shadow-md bg-white"
      >
        <h1 className="text-center text-2xl font-bold mb-4">Welcome Back</h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2   ">
            <Mail className="text-gray-500" />
            <input
              type="email"
              className="focus:outline-none w-full border-b border-gray-200"
              placeholder="Enter Email..."
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex justify-center">
          <Button type='submit'className="">Login</Button>
          </div>
          <p className="text-center">Dont have an account ? <Link to = "/register" className="text-blue-500 hover:underline">Register</Link></p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;



// Validation  => To validate the user inputs , we can use zod library for the schema validation. 
// Import zod library
// Define the schema 
// Import zodResolver from @hookform/resolvers/zod
// Pass the resolver in useForm hook to connect zod with react-hook-form.
