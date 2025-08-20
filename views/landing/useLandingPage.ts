import { gsapAnimation, SplitText } from "@/animation/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const useLandingPage = () => {
  const containerRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      const split = SplitText.create(".text", { type: "words" });
      const tl = gsapAnimation.timeline({ defaults: { duration: 1 } });
      tl.from(split.words, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power1.out",
      }).from(
        ".cta-button",
        {
          y: 50,
          autoAlpha: 0,
          ease: "power1.out",
        },
        "-=1"
      );
    },
    { scope: containerRef }
  );

  const handleGoToSession = contextSafe(() => {
    const split = SplitText.create(".text", { type: "words" });
    const tl = gsapAnimation.timeline({
      defaults: { duration: 1 },
      onComplete: () => {
        window.location.assign("/session");
      },
    });
    tl.to(split.words, {
      y: -50,
      opacity: 0,
      stagger: 0.05,
      ease: "power1.out",
    }).to(
      ".cta-button",
      {
        y: 100,
        opacity: 0,
        ease: "power1.out",
      },
      "-=1"
    );
  });

  return { containerRef, handleGoToSession };
};

export default useLandingPage;
