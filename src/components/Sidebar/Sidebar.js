import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const categories = ["Nirvana", "Queen", "Green Day", "Silverchair", "Eminem", "Alice in Chains"];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Category</h2>
      <ul>
        {categories.map((band, index) => {
          const isActive = location.pathname === `/shop/${band}`;

          return (
            <li key={index}>
              <Link
                to={`/shop/${band}`}
                className={isActive ? "active" : ""}
              >
                {band}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
