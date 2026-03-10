import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
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

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new SplitText(".landing-h2-info", TextProps);
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

  var landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitText(".landing-h2-1", TextProps);
  var landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

/**
 * Called when the user navigates BACK to the home page from /blog.
 * Kills stale GSAP tweens, resets text positions, then re-runs
 * the full intro + loop animation sequence.
 */
export function resetHomeFX() {
  // Kill any running tweens on landing elements so they don't conflict
  gsap.killTweensOf([
    ".landing-h2-info .char",
    ".landing-h2-info-1 .char",
    ".landing-h2-1 .char",
    ".landing-h2-2 .char",
    ".landing-intro h1 .char",
    ".landing-intro h2 .char",
    ".landing-info h3 .char",
    ".landing-info-h2",
    ".header",
    ".icons-section",
    ".nav-fade",
  ]);

  // Hard-reset all split-text chars to visible starting position
  gsap.set(
    [".landing-h2-info .char", ".landing-h2-info-1 .char",
      ".landing-h2-1 .char", ".landing-h2-2 .char",
      ".landing-intro h1 .char", ".landing-intro h2 .char",
      ".landing-info h3 .char"],
    { y: 0, opacity: 1, filter: "blur(0px)", clearProps: "all" }
  );

  // Reveal nav + icons immediately
  gsap.set([".header", ".icons-section", ".nav-fade"], { opacity: 1 });

  // Re-run the full fx with a tiny delay so the DOM is ready
  document.body.style.overflowY = "auto";
  if (smoother) smoother.paused(false);

  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 60, filter: "blur(4px)" },
    { opacity: 1, duration: 1, filter: "blur(0px)", ease: "power3.out", y: 0, stagger: 0.025, delay: 0.15 }
  );

  const TextProps = { type: "chars,lines" as const, linesClass: "split-h2" };

  // First word of the rotating pair
  const landingText2 = new SplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 60, filter: "blur(4px)" },
    { opacity: 1, duration: 1, filter: "blur(0px)", ease: "power3.out", y: 0, stagger: 0.025, delay: 0.15 }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 20 },
    { opacity: 1, duration: 1, ease: "power1.out", y: 0, delay: 0.5 }
  );

  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new SplitText(".landing-h2-1", TextProps);
  const landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
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
}
