import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Reviews from "../pages/Reviews";
import Coupons from "../pages/Coupons";
import FindUs from "../pages/FindUs";
import Contact from "../pages/Contact";
import Jobs from "../pages/Jobs";
import CarCareTips from "../pages/CarCareTips";
import TireCareTips from "../pages/TireCareTips";
import TermsOfUse from "../pages/TermsOfUse";
import Privacy from "../pages/Privacy";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about">
        <Route index element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="find-us">
        <Route index element={<FindUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>
      <Route path="/coupons" element={<Coupons />} />
      <Route path="services">
        <Route path="car-care-tips" element={<CarCareTips />} />
      </Route>
      <Route path="tires">
        <Route path="tire-care-tips" element={<TireCareTips />} />
      </Route>
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
};

export default RoutesComponent;
