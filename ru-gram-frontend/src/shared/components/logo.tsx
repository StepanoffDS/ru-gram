import Image from 'next/image';

import logo from '../../../public/images/logo.svg';

interface LogoProps {
  size?: 'small' | 'medium';
}

export function Logo({ size = 'medium' }: LogoProps) {
  return (
    <div className='flex items-end-safe gap-1'>
      <Image
        src={logo}
        alt='logo'
        width={40}
        height={40}
      />
      {size === 'medium' && (
        <span className='font-comfortaa -mb-0.5 -ml-0.5 text-2xl leading-none font-bold'>
          u-gram
        </span>
      )}
    </div>
  );
}
