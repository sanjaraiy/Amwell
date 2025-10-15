import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <div
            className="w-44 cursor-pointer flex gap-2 items-center"
            onClick={() => navigate("/")}
          >
            <svg
              width="42"
              height="32"
              viewBox="0 0 46 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 33L4.60606 25H12.2448C17.2569 25 21.4947 28.7103 22.1571 33.6784L23 40H13L11.5585 36.6365C10.613 34.4304 8.44379 33 6.04362 33H0Z"
                fill="#0047C1"
              ></path>
              <path
                d="M46 33L41.3939 25H33.7552C28.7431 25 24.5053 28.7103 23.8429 33.6784L23 40H33L34.4415 36.6365C35.387 34.4304 37.5562 33 39.9564 33H46Z"
                fill="#0047C1"
              ></path>
              <path
                d="M4.60606 25L18.9999 0H23L22.6032 9.52405C22.2608 17.7406 15.7455 24.3596 7.53537 24.8316L4.60606 25Z"
                fill="#0047C1"
              ></path>
              <path
                d="M41.3939 25L27.0001 0H23L23.3968 9.52405C23.7392 17.7406 30.2545 24.3596 38.4646 24.8316L41.3939 25Z"
                fill="#0047C1"
              ></path>
            </svg>
            <h1 className="text-xl md:text-3xl font-bold text-[#0a1baf]">
              Amwell
            </h1>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
           The information provided on this platform is for general health guidance and does not replace professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment. Your health and privacy are our top priorities.
          </p>
        </div>

        {/* Center Section  */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Privacy policy</Link>
          </ul>
        </div>

        {/* Right Section  */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 9351646145</li>
            <li>sanjayrai33724@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 (Sanjay Rai Developer) - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
