import { useEffect } from "react";
import { useLoading } from "../context/LoadingProvider";
import { smoother } from "../components/Navbar";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import Cursor from "../components/Cursor";
import { Link } from "react-router-dom";
import { galleryItems } from "../data/galleryData";
import { gsap } from "gsap";
import "../styles/GalleryPage.css";

const GalleryPage = () => {
    const { setIsLoading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(100);
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflowY = "auto";
            if (smoother) smoother.paused(false);
            
            // Fade in navigation elements
            document
                .querySelectorAll<HTMLElement>(".header, .icons-section, .nav-fade")
                .forEach((el) => (el.style.opacity = "1"));

            // Animate gallery items reveal
            gsap.fromTo(".gp-item", 
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.2, 
                    stagger: 0.15, 
                    ease: "power4.out",
                    delay: 0.2
                }
            );
        }, 400);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container-main">
            <Cursor />
            <Navbar />
            <SocialIcons />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    
                    {/* ── Hero ── */}
                    <div className="gp-hero">
                        <div className="gp-hero-inner">
                            <Link to="/" className="gp-back-link" data-cursor="disable">
                                ← Back to Portfolio
                            </Link>
                            <p className="gp-hero-tag">Visual Showcase</p>
                            <h1 className="gp-hero-title">
                                My <span>Gallery</span>
                            </h1>
                            <p className="gp-hero-sub">
                                A curated collection of my visual work, photography, 
                                and digital experiments.
                            </p>
                        </div>
                        <div className="gp-hero-glow" />
                        <div className="gp-hero-glow gp-hero-glow--2" />
                    </div>

                    {/* ── Gallery Grid ── */}
                    <section className="gp-section">
                        <div className="gp-grid">
                            {galleryItems.map((item) => (
                                <div key={item.id} className="gp-item" data-cursor="disable">
                                    <img src={item.image} alt={item.title} className="gp-item-img" />
                                    <div className="gp-item-overlay">
                                        <div className="gp-item-content">
                                            <span className="gp-item-category">{item.category}</span>
                                            <h3 className="gp-item-title">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Footer ── */}
                    <div className="bp-footer-strip">
                        <p>© 2026 Rimon Dutta — All rights reserved.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
