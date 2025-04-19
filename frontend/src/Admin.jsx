import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdCareer from "./components/Admin/AdCareer";
import Portfolio from "./components/Admin/AdPortfolio";
import Service from "./components/Admin/AdService";
import Dashboard from "./components/Admin/AdDashboard";
import Application from "./components/Admin/Applications";
import AdInquiry from "./components/Admin/AdInquiry";
import CustomerForm from "./components/Admin/CustomerForm";
import AddTestimonial from "./components/Admin/AddTestimonial";
import AdDashboard from "./components/Admin/AdDashboard";
import AddTeamMember from "./components/Admin/AdAboutUs";
import Signup from "./components/Admin/signup";
import Profile from "./components/Admin/adProfile";
import TeamStories from "./components/Admin/TeamStories";
import PricingListForm from "./components/Admin/pricingList";
import AdminContactForm from "./components/Admin/AdminContactForm";

const Admin = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/addAdmin" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="pricing" element={<PricingListForm />} />
        <Route path="career" element={<AdCareer />} />
        <Route path="team" element={<AddTeamMember />} />
        <Route path="inquiry" element={<AdInquiry />} />
        <Route path="application" element={<Application />} />
        <Route path="customerform" element={<CustomerForm />} />
        <Route path="testimonials" element={<AddTestimonial />} />
        <Route path="services" element={<Service />} />
        <Route path="dashboard" element={<AdDashboard />} />
        <Route path="team" element={<AddTeamMember />} />
        <Route path="teamstories" element={<TeamStories />} />
        <Route path="contactinfo" element={<AdminContactForm />} />
      </Routes>
    </MainLayout>
  );
};

export default Admin;
