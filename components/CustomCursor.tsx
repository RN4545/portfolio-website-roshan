
"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if the device supports hovering (mouse/trackpad)
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    setEnabled(true);

    let ringX = 0, ringY = 0;
    let cursorX = 0, cursorY = 0;
    let animFrame: number;

    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
    };

    const animateRing = () => {
      ringX += (cursorX - ringX) * 0.15;
      ringY += (cursorY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animFrame = requestAnimationFrame(animateRing);
    };
    animFrame = requestAnimationFrame(animateRing);

    const onScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressRef.current.style.width = `${progress}%`;
    };

    const onEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "6px";
        cursorRef.current.style.height = "6px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "56px";
        ringRef.current.style.height = "56px";
        ringRef.current.style.borderColor = "rgba(100,200,255,0.8)";
        ringRef.current.style.borderRadius = "12px";
      }
    };

    const onLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "10px";
        cursorRef.current.style.height = "10px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(100,200,255,0.5)";
        ringRef.current.style.borderRadius = "50%";
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%, -50%) scale(0.7)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%, -50%) scale(0.85)";
    };

    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, input, textarea, [role='button']").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("scroll", onScroll);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={progressRef} className="scroll-progress" style={{ width: "0%", pointerEvents: "none" }} />
      <div ref={cursorRef} className="custom-cursor" style={{ pointerEvents: "none" }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ pointerEvents: "none" }} />
    </>
  );
}