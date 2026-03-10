import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let loopingTimelines: gsap.core.Timeline[] = [];

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) smoother.paused(false);
  
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) mainEl.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  const targets = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const existingTargets = targets.filter(t => document.querySelector(t));
  
  if (existingTargets.length > 0) {
    const landingText = new SplitText(existingTargets, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  const TextProps = { type: "chars,lines" as const, linesClass: "split-h2" };

  if (document.querySelector(".landing-h2-info")) {
    const landingText2 = new SplitText(".landing-h2-info", TextProps);
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    const landingText3 = document.querySelector(".landing-h2-info-1") ? new SplitText(".landing-h2-info-1", TextProps) : null;
    if (landingText3) {
      loopingTimelines.push(LoopText(landingText2, landingText3));
    }
  }

  if (document.querySelector(".landing-info-h2")) {
    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );
  }

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const l4 = document.querySelector(".landing-h2-1") ? new SplitText(".landing-h2-1", TextProps) : null;
  const l5 = document.querySelector(".landing-h2-2") ? new SplitText(".landing-h2-2", TextProps) : null;
  
  if (l4 && l5) {
    loopingTimelines.push(LoopText(l4, l5));
  }
}

export function killHomeFX() {
  loopingTimelines.forEach(tl => tl.kill());
  loopingTimelines = [];
  
  gsap.killTweensOf([
    ".landing-h2-info", ".landing-h2-info .char",
    ".landing-h2-info-1", ".landing-h2-info-1 .char",
    ".landing-h2-1", ".landing-h2-1 .char",
    ".landing-h2-2", ".landing-h2-2 .char",
    ".landing-intro h1", ".landing-intro h1 .char",
    ".landing-intro h2", ".landing-intro h2 .char",
    ".landing-info h3", ".landing-info h3 .char",
    ".landing-info-h2",
    ".header",
    ".icons-section",
    ".nav-fade",
  ]);
}

export function resetHomeFX() {
  killHomeFX();

  // Reveal nav + icons immediately
  gsap.set([".header", ".icons-section", ".nav-fade"], { opacity: 1 });

  // Re-run the full fx
  initialFX();
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
    
  return tl;
}
