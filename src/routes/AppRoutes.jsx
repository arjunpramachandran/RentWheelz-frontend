import React from 'react'
import { createBrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../Layouts/RootLayout'
import HostLayout from '../Layouts/hostLayout'
import UserLayout from '../Layouts/UserLayout'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Vehicles from '../pages/Vehicles'
import Login from '../pages/Login'
import Register from '../pages/Register'
import About from '../pages/About'
import Locations from '../pages/Locations'

import ProtectedRoute from '../Layouts/ProtectedRoute'


import UserProfile from '../pages/User/UserProfile'
import UserBooking from '../pages/User/UserBookings'
import UserDashboard from '../pages/User/UserDashboard'


import Dashboard from '../pages/Host/Dashboard'
import HostRegister from '../pages/Host/HostRegister'
import LoginHost from '../pages/Host/LoginHost'
import AddVehicle from '../pages/Host/AddVehicle'
import MyVehicles from '../pages/Host/MyVehicle'
import VehicleDetailsPage from '../pages/VehicleDetailsPage'
import VehicleBooking from '../pages/User/VehicleBooking'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'vehicle', element: <Vehicles /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'locations', element: <Locations /> },
      { path:'vehicle/:id' , element:<VehicleDetailsPage/>},
      {
        path: "user",
        element: <ProtectedRoute allowedRole="customer"><UserLayout/></ProtectedRoute>,
        children: [
          { path: 'userDashboard', element: <UserDashboard /> },
          { path: 'userProfile', element: <UserProfile /> },
          { path: 'userBooking', element: <UserBooking /> },
          {path:'vehicleBooking/:id', element:<VehicleBooking/>}
          

        ]
      },
       
      {
        path: 'host/login',
        element: <LoginHost />,
      },
      {
        path: 'host/register',
        element: <HostRegister />,
      },

      
      {
        path: 'host',
        element: (
          <ProtectedRoute allowedRole="host">
            <HostLayout />
          </ProtectedRoute>
        ),
        children: [
          { path:"dashboard", element: <Dashboard /> },
          {path:'add-vehicle', element: <AddVehicle/>},
          {path: 'my-Vehicle', element: <MyVehicles />},
         
        ],
      },
    ],
  },
]);

export default router;
  


