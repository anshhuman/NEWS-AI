import { Link } from "react-router-dom";
import {motion} from "motion/react";
// import { Button } from '@mantine/core';

function Navbar() {
  return (
    <nav className="p-2">
    <div className="flex justify-between items-center mx-5">
      <motion.h1
      initial={{opactiy : 0 , y: -40}}
      animate = {{opacity: 1 , y : 0}}
      transition = {{duration : 1}}
      className="text-2xl font-semibold"
      >AI-NEWS </motion.h1>

      <ul className="flex gap-5">
        {["Home", "About", "Categories", "Contact"].map((item) => (
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

      <div> 
        <button>Login</button>
        <button>Register</button>
      </div>

    </div>
    </nav>
  );
}

export default Navbar;
