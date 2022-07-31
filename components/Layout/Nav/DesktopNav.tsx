import React from 'react';
import Link from 'next/link';

import DarkModeToggle from '../../Components/DarkModeToggle';

const DesktopNav = () => (
  <div className="hidden md:flex md:justify-between md:items-center">
    <Link href="/">
      <div className="flex items-center hover:bg-primary-400 md:py-2 md:px-4">
        <h2 className="ml-4 font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500"> Calculator </h2>
      </div>
    </Link>
    <div className="mx-4 my-2 flex items-center">
      <div className="mr-4">
        <DarkModeToggle />
      </div>
    </div>
  </div>
);
export default DesktopNav;
