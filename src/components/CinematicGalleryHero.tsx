import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Navbar from './Navbar';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Hero Section Component ──
const HeroSection = () => {
  return (
    <section className="bg-background relative overflow-hidden flex flex-col items-center w-full min-h-[60vh]">
      <div className="w-full relative z-50">
        <Navbar />
      </div>
      
      <div className="w-full flex flex-col items-center text-center pt-20 px-4 relative z-10">
        <h1 
          className="text-5xl sm:text-7xl md:text-[120px] lg:text-[180px] xl:text-[230px] font-normal leading-[1.02] tracking-[-0.024em] bg-clip-text text-transparent"
          style={{ 
            fontFamily: "'General Sans', sans-serif",
            backgroundImage: 'linear-gradient(223deg, #E8E8E9 0%, #3A7BBF 104.15%)'
          }}
        >
          Grow
        </h1>
        
        <p className="text-hero-sub text-center text-lg leading-8 max-w-md mt-4 opacity-80">
          The most powerful AI ever deployed<br />
          in talent acquisition
        </p>

        <div className="mt-8 mb-[66px]">
          <Button variant="heroSecondary" className="px-[29px] py-[24px]">
            Schedule a Consult
          </Button>
        </div>
      </div>
    </section>
  );
};

// ── Social Proof / Video Section Component ──
const logos = [
  { name: 'Vortex', initial: 'V' },
  { name: 'Nimbus', initial: 'N' },
  { name: 'Prysma', initial: 'P' },
  { name: 'Cirrus', initial: 'C' },
  { name: 'Kynder', initial: 'K' },
  { name: 'Halcyn', initial: 'H' },
];

const SocialProofSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        video.play().catch(e => console.log('Video play error:', e));
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    
    // Start loop
    video.play().then(() => {
      fadeLoop();
    }).catch(e => console.log('Video play error:', e));

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pt-16 pb-24 px-4 gap-20">
        {/* Spacer for video visibility */}
        <div className="h-40 w-full" />

        {/* Marquee Container */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 overflow-hidden">
          {/* Left Side */}
          <div className="text-foreground/50 text-sm whitespace-nowrap shrink-0">
            Relied on by brands <br className="hidden md:block"/>
            across the globe
          </div>

          {/* Right Side: Marquee */}
          <div className="flex-1 w-full overflow-hidden relative fade-edges">
            <div className="flex whitespace-nowrap animate-marquee items-center" style={{ width: 'max-content' }}>
              {/* Duplicate logos for seamless scrolling */}
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0 mr-16">
                  <div className="w-6 h-6 rounded-lg liquid-glass flex items-center justify-center text-xs font-bold text-foreground">
                    {logo.initial}
                  </div>
                  <span className="text-base font-semibold text-foreground">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Main Page Composition ──
const CinematicGalleryHero: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <style dangerouslySetInnerHTML={{__html: `
        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
      <HeroSection />
      <SocialProofSection />
    </div>
  );
};

export default CinematicGalleryHero;
