import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SEO Specialist</h4>
                <h5>Organic Food LTD</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Improved website visibility through on-page, off-page, and technical SEO. Led keyword strategy, optimized site structure, and built high-quality backlinks. Delivered measurable growth in search rankings and traffic.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Front-End Engineer</h4>
                <h5>Isbx</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              experienced in building responsive web applications with React, JavaScript, HTML, and CSS. Skilled in integrating APIs, optimizing performance, and creating seamless user experiences while collaborating with design and backend teams.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Engineer</h4>
                <h5>
                  <a href="marketgrowthexperts.pages.dev" target="_blank" rel="noopener noreferrer">
                    Market Growth Experts
                  </a>
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              As a full-stack developer, I have hands-on experience building scalable, secure, and high-performance web applications using modern frontend and backend technologies. I design intuitive UI/UX interfaces, develop robust server-side logic, and integrate APIs, databases, and cloud services to deliver end-to-end solutions that are production-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;