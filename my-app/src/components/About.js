import React, { useEffect } from 'react';
import NavBar from './NavBar';
import WOW from 'wowjs';
import '../css/About.css'; 

const About = () => {
  
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1 className="wow fadeInUp">Lifestyle Revolution</h1>
        <h2 className="wow fadeInUp">Integrating Health and Weight Management with Carbon Emission Reduction</h2>
        
        <section className="about-mission wow fadeInUp" data-wow-delay="0.1s">
          <h3>Our Mission</h3>
          <p>
            At Step Venture, we are committed to revolutionizing lifestyles by integrating health improvement and environmental sustainability. Our mission is to empower individuals to take charge of their health while also making significant contributions to carbon emission reduction. 
          </p>
        </section>

        <section className="about-problem wow fadeInUp" data-wow-delay="0.2s">
          <h3>The Problem</h3>
          <p>
            With obesity rates soaring and carbon emissions at an all-time high, the need for a change has never been more urgent. Our platform seeks to address these issues head-on by encouraging active lifestyles and sustainable living habits.
          </p>
        </section>

        <section className="about-strategy wow fadeInUp" data-wow-delay="0.3s">
          <h3>Our Strategy</h3>
          <p>
            Through our interactive platform, we propose innovative solutions such as fitness tracking, carbon footprint calculations, and incentivized challenges to motivate and educate users about the impact of their daily choices on their health and the environment.
          </p>
        </section>

        <section className="about-goals wow fadeInUp" data-wow-delay="0.4s">
          <h3>Goals and Impact</h3>
          <p>
            Our goal is to create a community where health and environmental consciousness go hand in hand. By making data-driven decisions more accessible and engaging, we aim to foster a culture of wellness and ecological responsibility.
          </p>
        </section>

        {/* Additional animated sections as needed */}

      </div>
    </>
  );
};

export default About;