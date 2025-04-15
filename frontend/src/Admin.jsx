import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdCareer from "./components/Admin/adcareer";
import Portfolio from "./components/Admin/AdPortfolio";
import Service from "./components/Admin/AdService";
import Dashboard from "./components/Admin/AdDashboard";
import Application from "./components/Admin/Applications";
import AdInquiry from "./components/Admin/AdInquiry";
import CustomerForm from "./components/Admin/CustomerForm";
import AddTestimonial from "./components/Admin/AddTestimonial";
import AdDashboard from "./components/Admin/AdDashboard";
import AddTeamMember from "./components/Admin/AdAboutUs";
import TeamStories from "./components/Admin/TeamStories";

const Admin = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="services" element={<Service />} />
        <Route path="career" element={<AdCareer />} />
        <Route path="inquiry" element={<AdInquiry />} />
        <Route path="application" element={<Application />} />
        <Route path="customerform" element={<CustomerForm />} />
        <Route path="testimonials" element={<AddTestimonial />} />
        <Route path="dashboard" element={<AdDashboard />} />
        <Route path="team" element={<AddTeamMember />} />
        <Route path="teamstories" element={<TeamStories />} />
      </Routes>
    </MainLayout>
  );
};

export default Admin;
