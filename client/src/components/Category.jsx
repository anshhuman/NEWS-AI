import React from 'react'
import { Tabs } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticleCard from './ArticleCard';


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

    const fetchNewsByCategory = async ({pageParam = 1}) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pref/news/${activeCategory}`,{params : {page : pageParam}}
        );
        return response.data;
        // console.log(`Response :  ${response}`)
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const { data, hasNextPage, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['category', activeCategory],
    queryFn: fetchNewsByCategory,
    getNextPageParam: (lastPage) =>  lastPage.nextPage 
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
      <div>
          <InfiniteScroll
            dataLength={
            data?.pages.length >= 0 &&
            data?.pages.reduce(
              (total, page) => total + page.articles.length,
              0 || 0
            )
          }
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            } > 
            {data?.pages.length >= 0 && 
            data?.pages.map((page , pageIndex) => 
                page.articles.map((article , articleIndex) => (
                  <ArticleCard key={article.url} article={article} category={activeCategory} />
                ))
            )
              }
            </InfiniteScroll>
        </div>
    </div>
    
  )
}

export default Category
