// import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import Sidebar from '../../components/shared/Sidebar'
import MobileNav from '@/components/shared/MobileNav'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    // <ClerkProvider>
        
    <main className='root '>
        <Sidebar></Sidebar>
        <MobileNav></MobileNav>
        <div className='root-container'>
            <div className='wrapper'>

            {children}
            </div>
        </div>
    </main>
    // </ClerkProvider>
  )
}

export default Layout