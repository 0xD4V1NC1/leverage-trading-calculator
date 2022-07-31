import React, { useEffect, useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

import Button from '../UI/Button';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useDarkMode();
  const [iconName, setIconName] = useState<string>('');
  const [ariaLabel, setAriaLabel] = useState<string>('');

  useEffect(() => {
    const icon = `${isDark ? 'sun' : 'moon'}`;
    const label = `Click to toggle theme to ${isDark ? 'light' : 'dark'} mode`;
    setIconName(icon);
    setAriaLabel(label);
  }, [isDark]);

  return (
    <Button
      type="button"
      ariaLabel={ariaLabel}
      color="none"
      icon={{
        name: iconName,
        size: 'large',
        position: 'none',
        color: 'black',
        className: 'hover:text-primary-400 dark:hover:text-primary-400',
        solid: true,
      }}
      onClick={() => setIsDark(!isDark)}
    />
  );
};
export default DarkModeToggle;
