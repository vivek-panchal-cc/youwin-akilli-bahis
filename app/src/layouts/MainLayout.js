import React from 'react'
import AppFooter from '../components/common/footer/AppFooter'
import AppHeader from '../components/common/header/AppHeader'
import { Outlet } from 'react-router-dom'

/**
 *  HomePageLayout - component use for home page layout. 
 */

const MainLayout = () => {
  return (
    <div className='homepage_layout'>
        <AppHeader />
        <div className='layout_content'>
            <Outlet />
        </div>
        <AppFooter/>
    </div>
  )
}

export default MainLayout