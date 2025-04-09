import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./sidebar.css";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GiAstronautHelmet } from "react-icons/gi";
import { TfiBriefcase } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px", height: "100vh" }}
    >
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
          <img src={Logo} className="img-fluid" alt="logo" />
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <RiDashboardHorizontalFill /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/portfolio"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <TfiBriefcase /> Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/career"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <GiAstronautHelmet /> Career
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/team"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <RiTeamFill /> Team Members
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/inquiry"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <SiGooglebigquery /> Inquiry
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/application"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <MdEmail /> Applications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/customerform"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <BsPersonPlusFill /> Customer Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/testimonials"
            className={({ isActive }) =>
              `nav-link link-white ${isActive ? "active" : ""}`
            }
          >
            <MdOutlineReviews /> Testimonials
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
