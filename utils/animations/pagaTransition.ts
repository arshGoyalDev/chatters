import gsap from "gsap";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const animatePageIn = () => {
  const bannerOne = document.querySelector(".banner-1");
  const bannerTwo = document.querySelector(".banner-2");
  const bannerThree = document.querySelector(".banner-3");

  if (bannerOne && bannerTwo && bannerThree) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree], {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
    }).to([bannerOne, bannerTwo, bannerThree], {
      yPercent: 102,
      stagger: 0.2,
      rotate: -10,
      opacity: 0,
    });
  }
};

const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.querySelector(".banner-1");
  const bannerTwo = document.querySelector(".banner-2");
  const bannerThree = document.querySelector(".banner-3");

  if (bannerOne && bannerTwo && bannerThree) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree], {
      yPercent: -100,
      rotate: 10,
      opacity: 0,
    }).to([bannerOne, bannerTwo, bannerThree], {
      yPercent: 0,
      stagger: 0.2,
      rotate: 0,
      opacity: 1,

      onComplete: () => {
        router.push(href);
      },
    });
  }
};

export { animatePageIn, animatePageOut };
