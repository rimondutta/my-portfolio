import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import Navbar, { smoother } from "../components/Navbar";
import { galleryItems } from "../data/galleryData";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const logos = [
  { name: 'JavaScript', initial: 'JS' },
  { name: 'Python', initial: 'Py' },
  { name: 'php', initial: 'php' },
  { name: 'Golang', initial: 'Go' },
  { name: 'Node JS', initial: 'JS' },
  { name: 'DevOps', initial: 'OPS' },
];

const GalleryPage = () => {
  const { setIsLoading, setLoading } = useLoading();
  const videoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Stop loading screen
  useEffect(() => {
    setLoading(100);
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflowY = "auto";
      if (smoother) smoother.paused(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [setLoading, setIsLoading]);

  // Handle Video Fading Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const fadeLoop = () => {
      if (video.duration > 0) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (currentTime < 0.5) {
          video.style.opacity = (currentTime / 0.5).toString();
        } else if (currentTime > duration - 0.5) {
          video.style.opacity = ((duration - currentTime) / 0.5).toString();
        } else {
          video.style.opacity = '1';
        }
      }
      animationFrameId = requestAnimationFrame(fadeLoop);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch((e) => console.log('Video play error:', e));
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    video.play().then(() => fadeLoop()).catch(e => console.log(e));

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Handle Scroll Animations for Gallery Grid
  useEffect(() => {
    if (!galleryRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".bento-item",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, galleryRef);
    return () => ctx.revert();
  }, []);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      if (smoother) smoother.paused(true);
    } else {
      document.body.style.overflow = "auto";
      if (smoother) smoother.paused(false);
    }
  }, [selectedImage]);

  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-accent/30 selection:text-white flex flex-col items-center overflow-x-hidden">

      {/* ── Modern Lightbox Overlay ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-white/5 p-3 rounded-full hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>

          <div
            className="relative w-full max-w-[95vw] md:max-w-[85vw] max-h-[90vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Required CSS for Marquee edges */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />

      {/* ── Navbar ── */}
      <div className="w-full relative z-[100]">
        <Navbar />
      </div>

      <div id="smooth-wrapper" className="w-full">
        <div id="smooth-content" className="w-full flex flex-col items-center pt-[90px]">

          {/* ── Cinematic Hero Section ── */}
          <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-48 px-4 h-auto md:min-h-[70vh]">
            <div className="relative z-10 text-center flex flex-col items-center">
              <h1
                className="text-5xl sm:text-7xl md:text-[120px] lg:text-[180px] xl:text-[230px] font-normal leading-[1.02] tracking-[-0.024em] bg-clip-text text-transparent origin-bottom"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  backgroundImage: 'linear-gradient(223deg, #E8E8E9 0%, #3A7BBF 104.15%)'
                }}
              >
                Explore
              </h1>
              <p className="text-hero-sub text-center text-lg leading-8 max-w-md mt-4 opacity-80">
                My Image Gallery
              </p>
              <div className="mt-8">
                <a href="https://rimondutta.pages.dev/contact" target="_blank" rel="noopener noreferrer">
                  <Button variant="heroSecondary" className="px-[29px] py-[24px]">
                    Schedule a Meeting
                  </Button>
                </a>
              </div>
            </div>

            {/* Background Video */}
            <div className="absolute inset-x-0 bottom-0 h-full md:h-[120%] pointer-events-none select-none z-0">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                style={{ opacity: 0 }}
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent pointer-events-none" />
            </div>
          </section>

          {/* ── Marquee Section ── */}
          <section className="w-full relative z-10 pt-10 pb-24 items-center flex flex-col px-4 bg-background">
            <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden mx-auto">
              <div className="text-foreground/50 text-sm whitespace-nowrap shrink-0 text-center md:text-left">
                My TechStack <br className="hidden md:block" />
              </div>
              <div className="flex-1 w-full overflow-hidden relative fade-edges">
                <div className="flex whitespace-nowrap animate-marquee items-center w-max">
                  {/* Duplicate logos for seamless scrolling effect */}
                  {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
                    <div key={idx} className="flex items-center gap-3 shrink-0 mr-16">
                      <div className="w-6 h-6 rounded-lg liquid-glass flex items-center justify-center text-xs font-bold text-foreground">
                        {logo.initial}
                      </div>
                      <span className="text-base font-semibold text-foreground/80">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Modern Image Gallery (Bento Grid) ── */}
          <section className="w-full bg-background pb-32 pt-20 relative z-10 flex flex-col items-center">
            <div className="w-[94%] max-w-[1400px] mx-auto" ref={galleryRef}>
              {/* <div className="mb-20 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-5xl lg:text-[70px] font-semibold tracking-tighter text-foreground mb-6 font-general-sans !leading-[1.1]">
                  Visual <span className="text-accent">Exploration</span>
                </h2>
                <p className="text-muted-foreground max-w-lg text-base md:text-lg">
                  A curated collection of design experiments, architectural concepts, and digital art exploring the intersection of light and form.
                </p>
              </div> */}

              {/* Uniform Grid layout mapping via generic mapping to Tailwind classes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[350px] md:auto-rows-[400px] gap-6 w-full">
                {/* Display Existing Images */}
                {galleryItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className="bento-item group relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.1]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/30 to-transparent pointer-events-none mix-blend-multiply opacity-50" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="w-full flex justify-center py-12 bg-background border-t border-white/5 relative z-10">
            <p className="text-muted-foreground text-sm tracking-wide">© 2026 Rimon Dutta — All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
