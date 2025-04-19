import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-nav.png";
import "./sidebar.css";
import {
  MdDashboard,
  MdWork,
  MdOutlinePriceChange,
  MdOutlineWorkOutline,
  MdGroup,
  MdEmail,
  MdOutlineReviews,
  MdAdminPanelSettings,
  MdQuestionAnswer,
  MdPersonAdd,
  MdContactMail
} from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = ({ onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-64 h-full p-2 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      {/* Optionally add close button on mobile */}
      <div className="md:hidden flex justify-end p-2">
        <button onClick={onClose} className="text-xl text-gray-700 dark:text-gray-300">✕</button>
      </div>
      {/* Logo Section */}
      <NavLink to="/" className="flex items-center mb-6">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />
      </NavLink>

      <hr className="border-gray-300 dark:border-gray-700 mb-4" />

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-2 flex-1 overflow-y-auto min-h-0 pr-2">
        <li>
          <NavLink
            to="/admin/dashboard"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdDashboard className="mr-2" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/portfolio"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdWork className="mr-2" />
            <span>Portfolio</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/pricing"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdOutlinePriceChange className="mr-2" />
            <span>Service Pricing</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/career"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdOutlineWorkOutline className="mr-2" />
            <span>Career</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/teamstories"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdQuestionAnswer className="mr-2" />
            <span>Team Stories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/team"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdGroup className="mr-2" />
            <span>Team Members</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/inquiry"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdContactMail className="mr-2" />
            <span>Inquiry</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/application"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
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
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdPersonAdd className="mr-2" />
            <span>Customer Form</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/testimonials"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
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
            to="/admin/contactinfo"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdContactMail className="mr-2" />
            <span>Contact Information</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/addAdmin"
             onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-medium ${isActive
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

      <div className="shrink-0 mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-3 px-2 py-2">
          <img
            src="../assets/user.png" // Replace with the actual user profile image URL
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <span className="font-medium text-gray-800 dark:text-gray-200">{currentUser.username}</span>
        </div>
        <div className="flex flex-col mt-2 space-y-1 px-2">
          <NavLink
            to="/admin/profile"
             onClick={onClose}
            className="block w-full text-left px-2 py-1 text-sm text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/logout"
             onClick={onClose}
            className="block w-full text-left px-2 py-1 text-sm text-red-500 dark:text-red-500 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
