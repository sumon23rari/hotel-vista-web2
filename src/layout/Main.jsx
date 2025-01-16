import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
           <Navbar></Navbar>
            <div className='pt-24 min-h-[calc(100vh-68px)]'>
            <Outlet></Outlet> 
            </div>
          <Footer></Footer>
        </div>
    );
};

export default Main;