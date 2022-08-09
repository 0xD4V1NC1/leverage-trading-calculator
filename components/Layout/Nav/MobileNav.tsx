import React, { useState } from 'react';
import Link from 'next/link';

import Button from '../../UI/Button';
import Icon from '../../UI/Icon';
import Overlay from '../../UI/Overlay';

import DarkModeToggle from '../../Components/DarkModeToggle';

import nav from './nav.enum';
import Logo from '../../UI/icons/logo';

const MobileMenuOptions = ({
  isOverlayOpen,
  setIsOverlayOpen,
}:{
  isOverlayOpen: boolean,
  setIsOverlayOpen: (state: boolean) => void }) => {
  const { mobile } = nav;

  return (
    <Overlay open={!!isOverlayOpen} dismiss={() => setIsOverlayOpen(false)} ariaLabel="Mobile Navigation Options" maxWidth="max-w-[50%]">
      <ul className="mb-10">
        <li>
          <p className="text-xs uppercase pb-2 font-bold pl-6">Navigation</p>
        </li>
        {mobile.primary.items.map((item) => (
          <li key={item.label} className="px-6 hover:bg-gray-200 dark:hover:bg-primary-dark-400 rounded">
            <Button
              type="button"
              color="none"
              ariaLabel={`${item.ariaLabel}`}
              href={item.href || ''}
              className="flex w-9/10 mx-4 my-2 items-center cursor-pointer py-1 shadow-none rounded"
            >
              <Icon name={item.icon} size="xlarge" color="primary" className="mr-3" />
              <p className="text-lg text-primary-500 dark:text-white">{item.label}</p>
            </Button>
          </li>
        ))}
      </ul>
    </Overlay>
  );
};
const MobileNav = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <div id="mobile-nav-header" className="h-full grid grid-cols-3 px-8 py-2 items-center md:hidden">
        <DarkModeToggle />
        <Link href="/">
          <div className="h-full flex justify-center items-center hover:bg-primary-400 hover:cursor-pointer">
            <Logo gradientId="mobile-nav-logo" />
          </div>
        </Link>
        {/* <Button
          type="button"
          ariaLabel="Open Mobile Side Menu"
          onClick={() => setIsOverlayOpen(true)}
          color="none"
          icon={{
            name: 'menu-3', size: '2xlarge', color: 'black', position: 'none',
          }}
        /> */}
      </div>
      {/* The Mobile Menu Options is outside of the nav header b/c with justify-between and flex...
      it would move the button over */}
      <MobileMenuOptions isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
    </>
  );
};
export default MobileNav;
