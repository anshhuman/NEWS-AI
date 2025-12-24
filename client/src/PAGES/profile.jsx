import React from 'react'
import { Avatar, Tabs, Text, Button, Container, Card } from '@mantine/core';
import { Bookmark } from 'lucide-react';
import { size } from 'zod';
import { getCookie } from '../utils/utils.js';


function Profile() {

  return (

   <Container className="min-h-screen flex flex-col justify-center items-center gap-8 px-10 ">
  
  {/* Profile Section (SMALLER CARD) */}
  <div className="
    flex flex-col items-center gap-1.5 p-5 rounded-xl bg-white shadow-md w-full max-w-xs text-center">
    <Avatar size={100} radius={100} />

    <h1 className="text-lg font-semibold break-words">
      {getCookie("name")}
    </h1>

    <p className="text-xs text-gray-500 break-all">
      {getCookie("email")}
    </p>

    <Button
      variant="outline"
      size="xs"
      className="mt-2"
    >
      Edit Profile
    </Button>
  </div>

  {/* Tabs Section */}
  <div className="w-full max-w-3xl">
    <Tabs defaultValue="bookmarks">
      <Tabs.List grow className="flex flex-wrap">
        <Tabs.Tab value="bookmarks">📌 Bookmarks</Tabs.Tab>
        <Tabs.Tab value="liked-news">❤️ Liked News</Tabs.Tab>
        <Tabs.Tab value="AI-recommendations">🤖 AI Recommendations</Tabs.Tab>
        <Tabs.Tab value="preferences">⚙ Preferences</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="bookmarks" className="mt-4">
        Bookmark tab content
      </Tabs.Panel>

      <Tabs.Panel value="liked-news" className="mt-4">
        Liked news content
      </Tabs.Panel>

      <Tabs.Panel value="AI-recommendations" className="mt-4">
        AI content
      </Tabs.Panel>

      <Tabs.Panel value="preferences" className="mt-4">
        Preferences content
      </Tabs.Panel>
    </Tabs>
  </div>

</Container>



  )
}

export default Profile



//   <Container>
    //     <div>
    //         <Avatar size={120} radius={120} />
    //         <h1>{getCookie('name')}</h1>
    //         <h1>{getCookie('email')}</h1>
    //         <Button variant = "Outline" >Edit Profile</Button> 
    //     </div>

    //      <Tabs defaultValue="gallery">
    //   <Tabs.List>
    //     <Tabs.Tab value="bookmarks">📌 Bookmarks</Tabs.Tab>
    //     <Tabs.Tab value="liked-news" >❤️ Liked News</Tabs.Tab>
    //     <Tabs.Tab value="AI-recommendations" >🤖 AI Recommendations</Tabs.Tab>
    //     <Tabs.Tab value="preferences" >⚙ Preferences</Tabs.Tab>
    //   </Tabs.List>

    //   <Tabs.Panel value="bookmarks">
    //     Bookmark tab content
    //   </Tabs.Panel>

    //   <Tabs.Panel value="liked-news">
    //     Messages tab content
    //   </Tabs.Panel>

    //   <Tabs.Panel value="AI-recommendations">
    //     Settings tab content
    //   </Tabs.Panel>

    //   <Tabs.Panel value="preferences">
    //     Settings tab content
    //   </Tabs.Panel>

    // </Tabs>

    // </Container>