import React from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, FolderPen } from "lucide-react";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
// import { register } from "../../../server/Controller/authController";


function register() {

  const [isEyeClick, setIsEyeClick] = useState(false);

  // Create a validation schema for user registeraion
  const registerSchema = z.object({
    name: z.string()
          .min(2 , {message : "Name should be atleast 2 characters long"}),
    email: z.string()
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
    })
  

  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick)
  };

  const { register, handleSubmit , reset , formState : {errors} } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data) => {
    console.log(data)
    reset();
  }

  return (
    <div>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full rounded-2xl p-6 shadow-md bg-white"
        >
          <h1 className="text-center text-2xl font-bold mb-4">Welcome !</h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2   ">
              <FolderPen className="text-gray-500" />
              <input
                type="name"
                className="focus:outline-none w-full border-b border-gray-200"
                placeholder="Enter Name..."
                {...register("name")}
              />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
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
                type={isEyeClick ? "text" : "password"}
                className="focus:outline-none w-full border-b border-gray-200"
                placeholder="Enter Password..."
                {...register("password")}
              />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center">
              <Button type="submit"className="">Register</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default register;




//  How to use react-hook-form ? 

// 1. Install the library: npm install react-hook-form
// 2. Import useForm: import { useForm } from 'react-hook-form';
// 3. Initialize the form: const { register, handleSubmit, formState: { errors } } = useForm();
// 4. Type {...register('input name')} in your input field to take the data out. 
// 5. Create a function onSubmit to handle the form data when it got submitted.
