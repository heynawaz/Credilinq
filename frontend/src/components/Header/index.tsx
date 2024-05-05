'use client';
import Image from 'next/image';

export function Header() {
    return (
        <>
            <header className='w-full flex justify-between items-center px-48 h-[126px] bg-[url("/assets/img/header-bg.jpg")] bg-cover'>
                <Image src={'/assets/svg/logo.svg'} width={135} height={100} alt='logo' />
                <h1 className='text-white text-[28px]'>SME HealthCheck - Get Started</h1>
            </header>
        </>
    );
}
