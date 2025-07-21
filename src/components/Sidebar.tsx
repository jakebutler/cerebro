import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen p-4 shadow-md bg-white">
      {/* Add Navigation Links Here */}
      <nav>
        <ul>
          <li className="mb-2"><a href="/">Home</a></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
