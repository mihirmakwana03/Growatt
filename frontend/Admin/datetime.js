import React, { useState, useEffect } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <div
        className="card shadow-lg p-2"
        style={{ backgroundColor: "#23b7bb" }}
      >
        <div
          className="card-body text-center fw-bolder"
          style={{
            color: "#f2912a",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <p className="fs-5 mb-2">
            <h2>
              <BsCalendarDateFill />
              &nbsp;<strong>Date:</strong> {formatDate(currentTime)}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <IoIosTime />
              &nbsp;<strong>Time:</strong> {formatTime(currentTime)}
            </h2>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
