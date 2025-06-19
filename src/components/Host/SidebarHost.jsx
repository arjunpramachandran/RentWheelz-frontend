
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
 
  { name: 'My Vehicles', path: '/host/my-Vehicle' },
  { name: 'Add Vehicle', path: '/host/add-vehicle' },
  { name: 'Bookings', path: '/host/bookings' },
];

const SidebarHost = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Host Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`p-2 rounded hover:bg-gray-700 ${
              pathname === link.path ? 'bg-gray-700' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarHost;
