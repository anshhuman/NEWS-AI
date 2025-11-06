import React from 'react';
import Navbar from './components/Navbar';
import '@mantine/core/styles.css';
import { Routes , Route } from 'react-router-dom';
import Login from './PAGES/login.jsx';
import Register from './PAGES/register.jsx';

function App() {
  return(
    <div>
      <Navbar />
        <Routes>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
        </Routes>
    </div>    
  );
}

export default App;