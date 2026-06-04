import React from 'react';
import { Outlet } from 'react-router-dom';
import HeroSection from './HeroSection';
import ProductPage from './ProductPage';
import FeaturedSection from './FeaturedSection';
import Footer from './Footer';
import Header from './Header';

function Landing() {
  return (
    <div>
      <Header/>
      <HeroSection />
      <FeaturedSection />
      <ProductPage />
      <Footer/>
    </div>
  );
}

export default Landing;
