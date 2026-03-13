import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import MusicPlaylist from "./MusicPlaylist";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h2>Contact</h2>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:rajeshchittyal21@gmail.com" data-cursor="disable">
                info.rimondutta@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>BSc in Computer Science</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/rimondutta"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/rimon-dutta"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://x.com/dev_rimon_dutta"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/rimon_dutta.py"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <MusicPlaylist />
          </div>
        </div>
        <div className="footer-bar">
          <div className="footer-credit">
            <h5>
              <MdCopyright />2026
            </h5>
            <h2>
              Rimon Dutta <span>All Rights Reserved</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
