import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

/**
 * Main Layout with sidebar and page content
 * 
 * @returns {JSX.Element} Main Layout
 */
function MainLayout() {
  return (
    <div className="overflow-x-hidden flex min-h-screen">
      <Sidebar />

        <main className='flex-1 p-10 h-screen overflow-y-auto bg-stone-100'>
          <Outlet />
        </main>
    </div>
  );
}

export default MainLayout;
