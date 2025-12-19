import React from 'react'
import { Navigate , Outlet } from 'react-router-dom';
import { getCookie } from '../utils/utils.js';


function ProtectedRoutes() {
    const authenticated = getCookie('authenticated');
    if(!authenticated) {
        return <Navigate to = '/login'/>
    }
  return <Outlet/>
}

export default ProtectedRoutes

// import React from 'react';
// import { getCookie } from '../utils/utils';
// import { Navigate, Outlet } from 'react-router-dom';
// function ProtectedRoutes() {
//   const authenticated = getCookie('authenticated');

//   if (!authenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <Outlet/>
// }

// export default ProtectedRoutes;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// function ProtectedRoutes() {
//   const authenticated = useSelector(
//     (state) => state.authentication.authenticated
//   );

//   // ⏳ redux-persist hydration safety
//   if (authenticated === undefined) return null;

//   if (!authenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoutes;
