import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-nav.png";
import "./sidebar.css";
import { RiDashboardHorizontalFill, RiTeamFill } from "react-icons/ri";
import { GiAstronautHelmet } from "react-icons/gi";
import { TfiBriefcase } from "react-icons/tfi";
import { MdEmail, MdOutlineReviews, MdAdminPanelSettings } from "react-icons/md";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonPlusFill } from "react-icons/bs";

const Sidebar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <>
      {/* Floating user profile at top right */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={toggleProfileOptions}
            className="w-10 h-10 rounded-full overflow-hidden focus:outline-none border border-gray-300"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </button>
          {showProfileOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-md">
              <NavLink 
              to="/admin/adminProfile"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Edit Profile
              </NavLink>
              <NavLink
                to="/logout"
                className="block w-full text-left px-4 py-2 text-sm text-red-500 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col w-64 h-screen p-4 bg-gray-100 dark:bg-gray-900">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center mb-6">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>

        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <RiDashboardHorizontalFill className="mr-2" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/portfolio"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <TfiBriefcase className="mr-2" />
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/career"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <GiAstronautHelmet className="mr-2" />
              <span>Career</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/team"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <RiTeamFill className="mr-2" />
              <span>Team Members</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/inquiry"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <SiGooglebigquery className="mr-2" />
              <span>Inquiry</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/application"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <MdEmail className="mr-2" />
              <span>Applications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customerform"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <BsPersonPlusFill className="mr-2" />
              <span>Customer Form</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/testimonials"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <MdOutlineReviews className="mr-2" />
              <span>Testimonials</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/addAdmin"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <MdAdminPanelSettings className="mr-2" />
              <span>Add Admin</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
