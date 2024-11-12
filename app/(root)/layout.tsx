import React, { ReactNode } from 'react';
import Navbar from '@/components/ui/navigation/navbar';
import LeftSideBar from '@/components/ui/navigation/LeftSideBar';
import RightSideBar from '@/components/ui/navigation/RightSideBar';



const RootLayout = ({ children}: { children: ReactNode }) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar/>

      <div className='flex'>
        <LeftSideBar />

        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          {children}
        </section>

        <RightSideBar />
      </div>

    </main>

  )
}

export default RootLayout;

