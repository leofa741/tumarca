import React from 'react';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className="container mx-auto px-4">
      
      {/* Newsletter Section */}
      <div className="flex justify-center py-12">
        <div className="w-full max-w-2xl text-center">
          <h5 className="text-2xl font-bold mb-6">
            Subscribe to our Newsletter

         
          </h5>

          <div>
            <form className="mc-form">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  name="EMAIL" 
                  placeholder="Your Email Address" 
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
                <input 
                  type="submit" 
                  name="subscribe" 
                  value="Subscribe" 
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                />
              </div> 
              <div className="mc-status mt-4"></div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row gap-8 py-12 border-t border-gray-200">
        
        {/* Logo and Social Media */}
        <div className="w-full lg:w-1/4">
          <div className="mb-6">
            <a href="index.html">
              <Image
                src="/marca-1-ar-logo.png"
                width={70}
                height= {70}
                priority            
                loading="eager"
                draggable="false"
                quality={100}
                placeholder="blur"
                blurDataURL="/marca-1-ar-logo.png"
                alt="TU.MARCA.AR Logo"
              />
              <p className="mt-2 text-sm text-gray-600">Your brand, our passion.</p>
            </a>
          </div>

          <ul className="flex space-x-4">
            <li>
              <a href="#0" className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325,1.42-3.592,3.5-3.592 c0.699-0.002,1.399,0.034,2.095,0.107v2.42h-1.435c-1.128,0-1.348,0.538-1.348,1.325v1.735h2.697l-0.35,2.725h-2.348V21H20 c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#0" className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                </svg>
                <span className="sr-only">Telegram</span>
              </a>
            </li>
            <li>
              <a href="#0" className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M11.999,7.377c-2.554,0-4.623,2.07-4.623,4.623c0,2.554,2.069,4.624,4.623,4.624c2.552,0,4.623-2.07,4.623-4.624 C16.622,9.447,14.551,7.377,11.999,7.377L11.999,7.377z M11.999,15.004c-1.659,0-3.004-1.345-3.004-3.003 c0-1.659,1.345-3.003,3.004-3.003s3.002,1.344,3.002,3.003C15.001,13.659,13.658,15.004,11.999,15.004L11.999,15.004z"></path>
                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                  <path d="M20.533,6.111c-0.469-1.209-1.424-2.165-2.633-2.632c-0.699-0.263-1.438-0.404-2.186-0.42 c-0.963-0.042-1.268-0.054-3.71-0.054s-2.755,0-3.71,0.054C7.548,3.074,6.809,3.215,6.11,3.479C4.9,3.946,3.945,4.902,3.477,6.111 c-0.263,0.7-0.404,1.438-0.419,2.186c-0.043,0.962-0.056,1.267-0.056,3.71c0,2.442,0,2.753,0.056,3.71 c0.015,0.748,0.156,1.486,0.419,2.187c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45 c0.963,0.042,1.268,0.055,3.71,0.055s2.755,0,3.71-0.055c0.747-0.015,1.486-0.157,2.186-0.419c1.209-0.469,2.164-1.424,2.633-2.633 c0.263-0.7,0.404-1.438,0.419-2.186c0.043-0.962,0.056-1.267,0.056-3.71s0-2.753-0.056-3.71C20.941,7.57,20.801,6.819,20.533,6.111z M19.315,15.643c-0.007,0.576-0.111,1.147-0.311,1.688c-0.305,0.787-0.926,1.409-1.712,1.711c-0.535,0.199-1.099,0.303-1.67,0.311 c-0.95,0.044-1.218,0.055-3.654,0.055c-2.438,0-2.687,0-3.655-0.055c-0.569-0.007-1.135-0.112-1.669-0.311 c-0.789-0.301-1.414-0.923-1.719-1.711c-0.196-0.534-0.302-1.099-0.311-1.669c-0.043-0.95-0.053-1.218-0.053-3.654 c0-2.437,0-2.686,0.053-3.655c0.007-0.576,0.111-1.146,0.311-1.687c0.305-0.789,0.93-1.41,1.719-1.712 c0.534-0.198,1.1-0.303,1.669-0.311c0.951-0.043,1.218-0.055,3.655-0.055c2.437,0,2.687,0,3.654,0.055 c0.571,0.007,1.135,0.112,1.67,0.311c0.786,0.303,1.407,0.925,1.712,1.712c0.196,0.534,0.302,1.099,0.311,1.669 c0.043,0.951,0.054,1.218,0.054,3.655c0,2.436,0,2.698-0.043,3.654H19.315z"></path>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#0" className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M8.31 10.28a2.5 2.5 0 1 0 2.5 2.49 2.5 2.5 0 0 0-2.5-2.49zm0 3.8a1.31 1.31 0 1 1 0-2.61 1.31 1.31 0 1 1 0 2.61zm7.38-3.8a2.5 2.5 0 1 0 2.5 2.49 2.5 2.5 0 0 0-2.5-2.49zM17 12.77a1.31 1.31 0 1 1-1.31-1.3 1.31 1.31 0 0 1 1.31 1.3z"></path>
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.38 10.77a3.69 3.69 0 0 1-6.2 2.71L12 16.77l-1.18-1.29a3.69 3.69 0 1 1-5-5.44l-1.2-1.3H7.3a8.33 8.33 0 0 1 9.41 0h2.67l-1.2 1.31a3.71 3.71 0 0 1 1.2 2.72z"></path>
                  <path d="M14.77 9.05a7.19 7.19 0 0 0-5.54 0A4.06 4.06 0 0 1 12 12.7a4.08 4.08 0 0 1 2.77-3.65z"></path>
                </svg>
                <span className="sr-only">Tripadvisor</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Footer Links */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h6 className="text-lg font-bold mb-4">Location</h6>
            <p className="text-gray-600">
              456 Elm Street, Los Angeles <br />
              CA 90001
            </p>
          </div>
          
          <div>
            <h6 className="text-lg font-bold mb-4">Contacts</h6>
            <ul className="space-y-2">
              <li><a href="mailto:#0" className="text-gray-600 hover:text-blue-600 transition-colors">contact@lounge.com</a></li>
              <li><a href="tel:+2135551212" className="text-gray-600 hover:text-blue-600 transition-colors">(213) 555-123-3456</a></li>
            </ul> 
          </div>
          
          <div>
            <h6 className="text-lg font-bold mb-4">Opening Hours</h6>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="opening-hours__days text-gray-600">Weekdays</span>
                <span className="opening-hours__time text-gray-600">10:00am - 9:00pm</span>
              </li>
              <li className="flex justify-between">
                <span className="opening-hours__days text-gray-600">Weekends</span>
                <span className="opening-hours__time text-gray-600">9:00am - 10:00pm</span>
              </li>
            </ul> 
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
            <span>© Tu.Marca.Ar 2025</span> 
            <span className="mx-2">•</span>
            <span>Design by <a href="https://www.tumarca.ar" className="text-blue-600 hover:underline"> Tu.Marca.Ar</a></span>
            <span className="mx-2">•</span>
            Distributed by <a href="https://www.tumarca.ar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tu.Marca.Ar</a>
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