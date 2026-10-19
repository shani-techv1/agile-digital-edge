"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProductShot({ src, alt, href }) {
  const frameRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const frame = frameRef.current;
    if (!image || !frame) return;

    let tween;
    let cancelled = false;

    const start = () => {
      if (cancelled || !image.naturalHeight) return;
      const frameHeight = frame.clientHeight || 1;
      const scale = frame.clientWidth / (image.naturalWidth || frame.clientWidth || 1);
      const shownHeight = image.naturalHeight * scale;
      const screens = Math.max(1, shownHeight / frameHeight);
      tween = gsap.fromTo(
        image,
        { objectPosition: "50% 0%" },
        {
          objectPosition: "50% 100%",
          duration: Math.min(36, Math.max(12, screens * 5)),
          ease: "none",
          paused: true,
        }
      );
    };

    const onEnter = () => tween?.play();
    const onLeave = () => tween?.reverse();

    if (image.complete) start();
    else image.addEventListener("load", start, { once: true });

    frame.addEventListener("mouseenter", onEnter);
    frame.addEventListener("mouseleave", onLeave);

    return () => {
      cancelled = true;
      image.removeEventListener("load", start);
      frame.removeEventListener("mouseenter", onEnter);
      frame.removeEventListener("mouseleave", onLeave);
      tween?.kill();
    };
  }, []);

  return (
    <a className="browser-view" href={href} target="_blank" rel="noopener noreferrer" ref={frameRef}>
      <img ref={imageRef} className="product-shot" src={src} alt={alt} />
    </a>
  );
}
