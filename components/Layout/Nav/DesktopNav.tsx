import React from 'react';
import Link from 'next/link';

import DarkModeToggle from '../../Components/DarkModeToggle';
import Logo from '../../UI/icons/logo';

const DesktopNav = () => (
  <div id="desktop-nav-header" className="hidden h-full md:flex md:justify-between md:items-center">
    <Link href="/">
      <div className="h-full flex items-center hover:bg-primary-400 hover:cursor-pointer md:py-2 md:px-4">
        <Logo gradientId="desktop-nav-logo" />
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
