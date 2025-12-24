import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import '@mantine/core/styles.css';
import { Routes , Route } from 'react-router-dom';
import Login from './PAGES/login.jsx';
import Register from './PAGES/register.jsx';
import Preferences from './PAGES/preferences.jsx';
const Profile = lazy(()=>import('./PAGES/profile.jsx'));
import Homepage from './PAGES/homepage.jsx';
import { Toaster } from 'sonner';
import ProtectedRoutes from './COMPONENTS/ProtectedRoutes.jsx'
import PreferenceProtectRoute from './COMPONENTS/preferenceProtectRoute.jsx';
import Footer from './COMPONENTS/Footer';

function App() {
  return(
    <div>

      <Navbar />
      <Toaster/>
        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route element={<PreferenceProtectRoute/>}>
              <Route path='/preferences' element={<Preferences/>} />
              <Route path='/profile' element = {<Profile/>}/>
            </Route>
            <Route path='/' element={<Homepage/>} />
          </Route>

          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>

        </Routes>
      {/* <Footer/> */}

    </div>    
  );
}

export default App;