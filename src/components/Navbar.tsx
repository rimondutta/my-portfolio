import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    if (location.hash) {
      setTimeout(() => {
        smoother.scrollTo(location.hash, true, "top top");
        smoother.paused(false);
      }, 500);
    }

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
    // intentionally no return cleanup - smoother is long-lived
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (location.pathname === "/") {
      if (target.startsWith("#")) {
        e.preventDefault();
        smoother.scrollTo(target, true, "top top");
      }
    } else {
      if (target.startsWith("#")) {
        e.preventDefault();
        navigate("/" + target);
      }
    }
  };

  return (
    <>
      <div className="header">
        <Link to="/" className="navbar-title" data-cursor="disable">
          :) RIMON
        </Link>
        <a
          href="mailto:connect.rimondutta@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          connect.rimondutta@gmail.com
        </a>
        <ul>
          <li>
            <a
              href="/#about"
              data-href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              href="/#work"
              data-href="#work"
              onClick={(e) => handleNavClick(e, "#work")}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <Link to="/blog">
              <HoverLinks text="BLOG" />
            </Link>
          </li>
          <li>
            <a
              href="/#contact"
              data-href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
