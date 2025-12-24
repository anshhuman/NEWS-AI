import React from 'react'
import { Tabs } from '@mantine/core';


function Category() {
  const category = ["General" , "Business" , "Entertainment" , "Politics" , "Health"  , "Science"];
  return (
 <div className='py-12 px-10'>
      <h1 className="text-center space-y-10 my-6 font-bold text-2xl">Categories</h1>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          {category.map((cat) => (
            <Tabs.Tab className='text-gray-200' size="lg" value={cat}>{cat}</Tabs.Tab>))}
        </Tabs.List>
      </Tabs>
    </div>
  )
}

export default Category
