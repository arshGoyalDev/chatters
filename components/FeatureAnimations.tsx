"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureAnimationsProps {
  featureItemsRef: React.RefObject<HTMLDivElement[]>;
}

const FeatureAnimations = ({ featureItemsRef }: FeatureAnimationsProps) => {
  useEffect(() => {
    if (!featureItemsRef.current) return;

    const featureItems = featureItemsRef.current;

    featureItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [featureItemsRef]);

  return null;
};

export default FeatureAnimations; 