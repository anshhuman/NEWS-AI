import React, { useState } from "react";
import { motion } from "motion/react";
import { CircleCheckBig } from "lucide-react";
import { Button } from '@mantine/core';
import {useSelector , useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userPreferences } from "../redux/slice/prefrencesSlice";
import { Loader } from '@mantine/core';



function Preferences() {

  const {authenticated}  = useSelector((state)=>state.authentication)
  const {loading}  = useSelector((state)=>state.preferences)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(authenticated)

  if(authenticated === false) {
    navigate('/login')
  }

  const [selectedCategory, setSelectedCategory] = useState([]);

  const categories = [
    "Politics",
    "Sports",
    "Technology",
    "Business",
    "Health",
    "Science",
  ];

  const toogleCategory = (category) => {
    setSelectedCategory(
      selectedCategory.includes(category)
        ? selectedCategory.filter((cat) => cat !== category)
        : [...selectedCategory, category]
    );
  };

  const handleClick = async() => {
   await dispatch(userPreferences({preferences : selectedCategory}))
    navigate('/')
  }

  console.log(selectedCategory);

  return (

    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-xl font-bold text-4xl tracking-wide">
        <h1>Select your Interests</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-6 gap-6">
        {categories.map((category) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toogleCategory(category)}
            className={`shadow-md rounded-xl flex justify-center items-center text-center px-5 py-4
             ${
               selectedCategory.includes(category)
                 ? "bg-blue-400 text-white"
                 : null
             }`}
          >
            {/* <h1 className="text-black"> */}
            {selectedCategory.includes(category) && <CircleCheckBig />}
            {category}
            {/* </h1> */}
          </motion.div>
        ))}
      </div>
      <Button
          variant="light" 
          className="mt-5" 
          onClick={handleClick}>
          {loading ? <Loader size="sm" /> : "Save Preferences"}
          </Button>
    </div>
  );

}

export default Preferences;
