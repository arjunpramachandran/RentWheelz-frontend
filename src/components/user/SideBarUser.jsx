import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdSpaceDashboard } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";

const links = [
  { name: 'My Bookings', path: '/bookings' },
  { name: 'My Coupons', path: '/coupons' },
  { name: 'My Reviews', path: '/reviews' },
];

const SidebarUser = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 860);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 860);
    if (window.innerWidth >= 860) setIsOpen(false); // Reset on desktop
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
     
      {isMobile && (
        <button
          className="fixed top-10 left-30 z-50 text-cyan-600 text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? <RiCloseCircleFill /> : <MdSpaceDashboard />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={` top-[24] left-0 h-full bg-gray-800 text-white  p-4 z-40 transition-transform duration-300 ${
          isMobile
            ? isOpen
              ? 'translate-x-0 w-64 fixed'
              : '-translate-x-full w-64 fixed'
            : 'translate-x-0 w-64 '
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Rider Panel</h2>
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={`p-2 rounded hover:bg-gray-700 ${
                pathname === link.path ? 'bg-gray-700' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarUser;
