import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-nav.png";
import "./sidebar.css";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GiAstronautHelmet } from "react-icons/gi";
import { TfiBriefcase } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdContacts } from "react-icons/md";

const Sidebar = () => {
  return (
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
            to="/admin/pricing"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md font-medium ${
                isActive
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
            to="/admin/teamstories"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <AiOutlineTeam className="mr-2" />
            <span>Team Stories</span>
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
            to="/admin/contactinfo"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            <MdContacts className="mr-2" />
            <span>Contact Information</span>
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
      </ul>
    </div>
  );
};

export default Sidebar;
