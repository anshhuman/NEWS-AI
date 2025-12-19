import React from 'react';
import Navbar from './components/Navbar';
import '@mantine/core/styles.css';
import { Routes , Route } from 'react-router-dom';
import Login from './PAGES/login.jsx';
import Register from './PAGES/register.jsx';
import Preferences from './PAGES/preferences.jsx';
import Homepage from './PAGES/homepage.jsx';
import { Toaster } from 'sonner';
import ProtectedRoutes from './COMPONENTS/ProtectedRoutes.jsx'


function App() {
  return(
    <div>

      <Navbar />
      <Toaster/>

        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route path='/preferences' element={<Preferences/>} />
            <Route path='/' element={<Homepage/>} />
          </Route>

          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>

        </Routes>

    </div>    
  );
}

export default App;