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
    </Routes>
  );
};

export default RoutesComponent;
