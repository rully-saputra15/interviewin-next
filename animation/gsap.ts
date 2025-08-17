import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP);
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(SplitText);

export const gsapAnimation = gsap;

export { useGSAP as useGsap };
// export { ScrollTrigger };
// export { ScrollSmoother };
export { SplitText };
