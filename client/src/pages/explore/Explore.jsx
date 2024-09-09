import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center shadow-md">
      <Navbar />
    </header>
  );
};

const EmbeddedMap = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7015.9043059004725!2d77.5841963!3d28.450858700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1725171518238!5m2!1sen!2sin"
        width="800"
        height="600"
        style={{ border: "0", width: "100%", height: "100%" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const Details = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        GAS PIPELINE SERVICES IN DELHI
      </h1>
      <div className="flex items-center space-x-4 mb-6">
        <p className="text-gray-500">21 days . 20 nights</p>
        <button className="px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
          Started 31st Aug 2024
        </button>
      </div>
      <div className="space-x-2 mb-4">
        <button className="px-3 py-1 bg-blue-200 text-blue-600 rounded">
          Gas Pipeline
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded">
          Road construction
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded">
          Sewage
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded">
          Municipal Corporation
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded">
          Agency
        </button>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold">
          #1674 Gas pipeline - Hindustan Gas
        </h2>
        <p className="text-gray-600 mt-2">
          A road developed by one agency, may get damaged due to installation of
          gas pipelines or utility ducts on road 2 months later. This can be
          resolved with preemptive collaboration between both implementing
          agencies.
        </p>
        <a href="#" className="text-blue-500 mt-4 block">
          Discussion forum
        </a>
      </div>
    </div>
  );
};

const Explore = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8 flex">
        <div className="w-1/2">
          <EmbeddedMap />
        </div>
        <div className="w-1/2">
          <Details />
        </div>
      </div>
    </div>
  );
};

export default Explore;
