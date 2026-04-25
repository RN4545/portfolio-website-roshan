"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState("");
  const roles = ["Flutter Developer", "Mobile Architect", "UI Craftsman", "Dart Enthusiast"];
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let charIdx = 0;
    let deleting = false;
    let currentRole = roles[roleIdx];
    const interval = setInterval(() => {
      if (!deleting) {
        setTyped(currentRole.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentRole.length) { deleting = true; charIdx = currentRole.length; }
      } else {
        setTyped(currentRole.slice(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          setRoleIdx((i) => (i + 1) % roles.length);
          currentRole = roles[(roleIdx + 1) % roles.length];
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, [roleIdx]);

  const px = mousePos.x * 20;
  const py = mousePos.y * 20;

  return (
    <section ref={heroRef} id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 5vw 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,200,255,0.08) 0%, transparent 70%)",
        top: "-100px", left: "-100px",
        transform: `translate(${px * 1.5}px, ${py * 1.5}px)`,
        transition: "transform 0.1s ease", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
        bottom: "-50px", right: "-50px",
        transform: `translate(${-px}px, ${-py}px)`,
        transition: "transform 0.1s ease", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      <div style={{ maxWidth: "900px", width: "100%", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(100,200,255,0.06)", border: "1px solid rgba(100,200,255,0.15)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "32px",
          animation: "fadeUp 0.6s ease both",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>Available for work</span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(48px, 10vw, 120px)",
          fontWeight: "800", letterSpacing: "-0.04em", lineHeight: "0.9",
          marginBottom: "16px", animation: "fadeUp 0.6s 0.1s ease both",
        }}>
          <span style={{ display: "block", color: "var(--text)" }}>Hi, I'm</span>
          <span style={{
            display: "block",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-3) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{personalInfo.name}</span>
        </h1>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(14px, 3vw, 28px)",
          color: "var(--text-muted)", marginBottom: "24px",
          display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap",
          animation: "fadeUp 0.6s 0.2s ease both",
        }}>
          <span style={{ color: "var(--accent-2)" }}>// </span>
          <span>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "var(--accent)" }}>|</span>
        </div>

        <p style={{
          fontFamily: "var(--font-serif)", fontSize: "clamp(15px, 2vw, 20px)",
          color: "var(--text-muted)", lineHeight: "1.7", maxWidth: "560px",
          marginBottom: "40px", fontStyle: "italic", fontWeight: "300",
          animation: "fadeUp 0.6s 0.3s ease both",
        }}>{personalInfo.bio}</p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: "fadeUp 0.6s 0.4s ease both" }}>
          <a href="#projects" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "var(--accent)", color: "var(--bg)", padding: "12px 28px",
            borderRadius: "8px", fontFamily: "var(--font-display)", fontWeight: "700",
            fontSize: "15px", transition: "all 0.2s ease", boxShadow: "0 0 30px rgba(100,200,255,0.2)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(100,200,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(100,200,255,0.2)"; }}
          >
            View Work
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "transparent", color: "var(--text)", padding: "12px 28px",
            borderRadius: "8px", fontFamily: "var(--font-display)", fontWeight: "600",
            fontSize: "15px", border: "1px solid var(--border)", transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Get in Touch</a>
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "48px", flexWrap: "wrap", animation: "fadeUp 0.6s 0.5s ease both" }}>
          {[
            { label: "GitHub", href: personalInfo.github, icon: "GH" },
            { label: "LinkedIn", href: personalInfo.linkedin, icon: "IN" },
            { label: "Email", href: `mailto:${personalInfo.email}`, icon: "@" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)",
              display: "flex", alignItems: "center", gap: "8px",
              letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <span style={{
                width: "28px", height: "28px", border: "1px solid var(--border)",
                borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px",
              }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="scroll-indicator" style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        animation: "float 3s ease-in-out infinite",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--text-dim), transparent)" }} />
      </div>

      <style>{`@media (max-width: 768px) { .scroll-indicator { display: none !important; } }`}</style>
    </section>
  );
}