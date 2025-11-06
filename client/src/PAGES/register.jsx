import React from 'react'
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff , FolderPen} from "lucide-react";
import { Button } from "@mantine/core";
import { useState } from "react";

function register() {
    const [isEyeClick, setIsEyeClick] = useState(false);
      const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
      };
  return (
    <div>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className = "max-w-md w-full rounded-2xl p-6 shadow-md bg-white"
      >
        <h1 className="text-center text-2xl font-bold mb-4">Welcome !</h1>
        <form className="space-y-6 w-full">
          <div className="flex gap-2   ">
            <FolderPen className="text-gray-500" />
            <input
              type="name"
              className="focus:outline-none w-full border-b border-gray-200"
              placeholder="Enter Name..."
            />
          </div>
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
          <Button className="">Register</Button>
          </div>
        </form>
      </motion.div>
    </div>
    </div>
  )
}

export default register
