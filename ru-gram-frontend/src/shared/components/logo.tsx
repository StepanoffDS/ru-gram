import Image from 'next/image';
import logo from '../../../public/images/logo.svg';

interface LogoProps {
  size?: 'small' | 'medium';
}

export function Logo({ size = 'medium' }: LogoProps) {
  return (
    <div className='flex gap-1 items-end-safe'>
      <Image
        src={logo}
        alt='logo'
        width={40}
        height={40}
      />
      {size === 'medium' && (
        <span className='text-2xl font-bold leading-none font-comfortaa -mb-0.5 -ml-0.5'>
          u-gram
        </span>
      )}
    </div>
  );
}
