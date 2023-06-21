import React from 'react'
import logoImg from '../../../assets/images/logo.svg';

/**
 * 
 * AppHeader - common component use for show header in layout.
 * 
 */


const AppHeader = () => {
  return (
    <div className='header'>
      <div className='logo_img'>
        <img src={logoImg} alt="main logo"/>
      </div>
      <h4>AKILLI BAHIS</h4>
    </div>
  )
}

export default AppHeader