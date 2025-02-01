import React from 'react';
import CollectionCont from '../Collection/CollectionCont.js';
import './Home.css';

function Home() {
  return (
    <div>
      <div className='MaindivCont'>
        <div className="MainDiv">
          {/* Video Background */}
          <div className="VideoContainer">
            <video 
              className="VideoBackground" 
              src="https://cdn.shopify.com/videos/c/o/v/e7a211fec49e4737be811dcf07fe968a.mp4" 
              autoPlay 
              loop 
              muted
            ></video>
          </div>

          {/* Navbar */}
          <div className="NavbarCont">
          </div>
        </div>
        <CollectionCont />
      </div>
    </div>
  );
}

export default Home;