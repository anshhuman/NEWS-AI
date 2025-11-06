import { Link } from "react-router-dom";
import {motion} from "motion/react";
import { Button } from '@mantine/core';
import { X , Menu} from 'lucide-react';
import { useState } from "react";


function Navbar() {

  const [isOpen , setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-opacity-100 backdrop-blur-md p-4 text-black sticky top-0 z-50">
    <div className="flex justify-between items-center mx-5">
      <motion.h1
      initial={{opactiy : 0 , y: -40}}
      animate = {{opacity: 1 , y : 0}}
      transition = {{duration : 1}}
      className="text-2xl font-semibold"
      >AI-NEWS </motion.h1>

      <ul className="hidden md:flex gap-5">
        {["Home", "About", "Categories", "Contact" , "Blog"].map((item) => (
          <motion.li 
          whileHover = {{scale:1.1}}
          transition={{type:"spring" , stiffness:500}}
          key={item}
          className="hover:text-blue-500"
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
           </motion.li>
        ))}
      </ul>

      <div className="flex space-x-4 items-center justify-center"> 
        <Link to = "/login" 
            className="hidden md:block">
           <Button variant = "light" size="xs">Login</Button>
        </Link>
        <Link to = "/register"
            className="hidden md:block">
           <Button variant = "light" size="xs">Register</Button>
        </Link>
        <button onClick={handleClick} className="md:hidden">{isOpen ? <X/> : <Menu/>}</button>
      </div>

    </div>
    </nav>
  );
}

export default Navbar;
