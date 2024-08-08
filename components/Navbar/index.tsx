import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex gap-4 border-b bg-transparent px-2 py-4">
      <span>Logo</span>
      <ul className="flex gap-4">
        <li>Dasboard</li>
        <li>Issues</li>
        <li>Create Issue</li>
      </ul>
    </nav>
  );
};

export default Navbar;
