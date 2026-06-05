import React from 'react';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';


const Footer = () => {
  return (
    <footer className=" text-gray-800">
{/* Newsletter Section */}
<div className="flex justify-center py-12">
  <div className="w-full max-w-2xl text-center">
    <h5 className="text-2xl font-bold text-white mb-6">
      Subscribe to our Newsletter
    </h5>

    <NewsletterForm />
  </div>
</div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <a href="/">
              <Image
                src="/marca-2-ar-removebg.png"
                width={70}
                height={70}
                priority
                loading="eager"
                draggable="false"
                quality={100}
                placeholder="blur"
                blurDataURL="/marca-2-ar-removebg.png"
                alt="TU.MARCA.AR Logo"
                className="w-16 h-16 rounded-full object-cover "
              />
          
            </a>
          </div>

     
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-8 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
            <span>© TuMarca.Ar 2025</span>
            <span className="mx-2">•</span>
            <span>Design by <a href="https://www.tumarca.ar" className="text-blue-600 hover:underline"> TuMarca.Ar</a></span>
            <span className="mx-2">•</span>
            Distributed by <a href="https://www.tumarca.ar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TuMarca.Ar</a>
        
          </p>

          <div className="flex items-center space-x-2">
            <a href="#top" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              Back To Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;