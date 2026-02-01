import React from 'react'
import { Tabs } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';


function Category() {
  const [activeCategory, setActiveCategory] = useState('');
  console.log(activeCategory);
  const categories = 

  ["General" ,
    "Business" ,
    "Entertainment" ,
    "Politics" ,
    "Health" ,
    "Science",
    "Sports"];

    // const fetchNewsByCategory = async(req,res) => {
    //   const {category} = req.params;
    //   try{
    //     const response = await axios.get
    //     (`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
    //     console.log(response.data);
    //   }
    //   catch(error){
    //     console.error("Error fetching news:", error);
    //   }
    // }

    const fetchNewsByCategory = async (pageParams = 1) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pref/news/${activeCategory}`,{params : {page : pageParams}}
        );
        return response.data;
        console.log(`Response :  ${response}`)
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const { data, hasNextPage, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['category', activeCategory],
    queryFn: fetchNewsByCategory,
    getNextPageParam: (lastPage) => {
      // console.log(`lastPage.nextPage: ${lastPage.nextPage}`);
      return lastPage.nextPage;
    },
    });
    console.log(data);
    // console.log(hasNextPage);
    // console.log(fetchNextPage);
    // console.log(status);

  return (
 <div className='py-12 px-10'>
      <h1 className="text-center space-y-10 my-6 font-bold text-2xl">Categories</h1>

      <Tabs defaultValue="gallery"
      onChange={(value) => setActiveCategory(value.toLowerCase())}>
        <Tabs.List>
          {categories.map((cat) => (
            <Tabs.Tab className='text-gray-200' size="lg" value={cat}>{cat}</Tabs.Tab>))}
        </Tabs.List>
      </Tabs>
    </div>
  )
}

export default Category
