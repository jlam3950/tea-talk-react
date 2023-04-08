import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer d-flex flex-column align-items-center justify-content-center'>
      <div className = 'd-flex justify-content-center '>
        <div className=''>
          <FaFacebook className = 'footerIcon'/>
        </div>
        <div className=''>
          <FaInstagram className = 'footerIcon'/>
        </div>       
        <div className=''>
          <FaTwitter className = 'footerIcon'/>
        </div>
      </div>
      <div className="copyrightContainer">
        © teatalk 2023
      </div>
    </div>
  )
}

export default Footer