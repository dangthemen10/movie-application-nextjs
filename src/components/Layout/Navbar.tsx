'use client';

import { Menu, MenuItem } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${isScrolled && 'bg-[#141414]'} hover:bg-[#141414]`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href={'/'} className="font-bold text-3xl text-white">
          Flick.<span className="text-red-500">Flair</span>
        </Link>
        <ul className="hidden md:space-x-4 md:flex cursor-pointer items-center">
          <Link
            href={'/tv'}
            className={`navBarComponents ${
              pathname === '/tv' && 'bg-red-500 px-2.5 py-2.5 rounded-md'
            }`}
          >
            TV Shows
          </Link>
          <Link href={'/movie'} className="navBarComponents">
            Movies
          </Link>
          <Link
            href={'/people'}
            className={`navBarComponents ${
              pathname === '/people' && 'bg-red-500 px-2.5 py-2.5 rounded-md'
            }`}
          >
            People
          </Link>
          <Link
            href={'/search'}
            className={`navBarComponents ${
              pathname === '/search' && 'bg-red-500 px-2.5 py-2.5 rounded-md'
            }`}
            onClick={() => router.push('/search')}
          >
            Search
          </Link>
          {session && (
            <Link
              href={'/profile'}
              className={`navBarComponents ${
                pathname === '/profile' && 'bg-red-500 px-2.5 py-2.5 rounded-md'
              }`}
            >
              Profile
            </Link>
          )}
        </ul>
      </div>
      <div className="font-light flex items-center space-x-4 text-sm mr-8">
        {session ? (
          <div>
            <div className="flex items-center">
              <span className="rounded-md">{session.user.name}</span>
              <button onClick={handleClick} className="ml-2">
                <Image
                  src={session.user.image!}
                  alt={session.user.name! || ''}
                  className="w-9 rounded-3xl"
                  width={200}
                  height={200}
                />
              </button>
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={() => router.push('/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push('/profile')}>
                My account
              </MenuItem>
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <button
            className="bg-red-500 px-2.5 py-2.5 rounded-md text-sm font-medium"
            onClick={() => signIn('google')}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
