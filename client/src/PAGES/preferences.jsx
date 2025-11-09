import React , {useState} from "react";
import { motion } from "motion/react";
import { CircleCheckBig } from "lucide-react";

function Preferences() {
  const [selectedCategory , setSelectedCategory] = useState([]);
  const categories = [
    "Politics",
    "Sports",
    "Technology",
    "Business",
    "Health",
    "Science",
  ];
  const toogleCategory = (category) => {
    setSelectedCategory(selectedCategory.includes(category) ? 
    selectedCategory.filter((cat) => (cat !== category)) : [...selectedCategory , category]
)}
   console.log(selectedCategory)
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-xl font-semibold">Select preferences</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-6 gap-6">
        {categories.map((category) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toogleCategory(category)}
            className={`shadow-md rounded-xl flex justify-center items-center text-center px-5 py-4
             ${selectedCategory.includes(category) ? 'bg-blue-400 text-white' : 'bg-white text-black'}`}
          >
            {/* <h1 className="text-black"> */}
              {selectedCategory.includes(category) && <CircleCheckBig/>}
              {category}
            {/* </h1> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
