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
              src="https://cdn.shopify.com/videos/c/o/v/bf861138015a4c0caf95384ac27b20d7.mp4" 
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