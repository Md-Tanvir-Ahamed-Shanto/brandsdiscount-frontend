import React from "react";
import { LoginSection, LoginSidebar } from "./components"; 

const page = () => {
  return (
    <div className="container px-4 md:px-8 lg:mt-16">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden lg:col-span-6 lg:flex items-center justify-center py-6">
            <LoginSidebar />
          </div>
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center lg:px-8">
            <LoginSection /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
