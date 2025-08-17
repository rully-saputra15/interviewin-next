import { gsapAnimation, SplitText } from "@/animation/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const useLandingPage = () => {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      const split = SplitText.create(".text", { type: "words" });
      const tl = gsapAnimation.timeline({ defaults: { duration: 1 } });
      tl.from(split.words, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.05,
      }).from(
        ".cta-button",
        {
          y: 50,
          autoAlpha: 0,
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return { containerRef };
};

export default useLandingPage;
