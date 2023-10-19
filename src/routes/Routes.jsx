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
import ScheduleService from "../pages/ScheduleService";
import Tires from "../pages/Tires";
import NotFound from "../pages/404";
import Services from "../pages/Services";
import ServiceCat from "../pages/ServiceCat";
import RequestQuote from "../pages/RequestQuote";
import Financing from "../pages/Financing";
import Authenticate from "../pages/admin/Authenticate";
import Dashboard from "../pages/admin/Dashboard";
import Career from "../pages/admin/Career";
import PrivateRoute from "./private.route";
import AboutPage from "../pages/admin/AboutPage";
import SubmitReview from "../pages/SubmitReview";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit-a-review" element={<SubmitReview />} />
      <Route path="about">
        <Route index element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="find-us">
        <Route index element={<FindUs />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/join-our-team" element={<Jobs />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="services">
        <Route index element={<Services />} />
        <Route path=":serviceName" element={<ServiceCat />} />
        <Route path="car-care-tips" element={<CarCareTips />} />
        <Route path="schedule-service" element={<ScheduleService />} />
      </Route>
      <Route path="tires">
        <Route index element={<Tires />} />
        <Route path="quoting" element={<RequestQuote />} />
        <Route path="tire-care-tips" element={<TireCareTips />} />
      </Route>
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={<Authenticate />} />
      <Route path="admin" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="career" element={<Career />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
