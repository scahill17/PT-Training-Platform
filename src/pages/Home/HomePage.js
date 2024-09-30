import React from 'react';
import NavBar from '../../components/common/NavBar';
import SideBar from '../../components/common/SideBar';

const HomePage = () => {
  return (
    <div>
      <SideBar />
      <NavBar />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;