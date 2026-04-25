"use client";
import { useEffect, useRef, useState } from "react";

import ProjectCard from "./ProjectCard";
import { projects } from "@/data";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="projects" style={{ padding: "120px 5vw" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "16px", marginBottom: "80px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>04</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Projects</span>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "48px",
          flexWrap: "wrap", gap: "16px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: "800",
            letterSpacing: "-0.04em",
            lineHeight: "1",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s 0.1s ease",
          }}>
            Selected <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: "300", color: "var(--accent-2)" }}>work.</span>
          </h2>
          <a href="https://github.com" style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "var(--text-dim)",
            border: "1px solid var(--border)",
            padding: "10px 20px", borderRadius: "8px",
            letterSpacing: "0.08em", textTransform: "uppercase",
            transition: "all 0.2s",
            opacity: visible ? 1 : 0,
            transitionDelay: "0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(100,200,255,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
            }}
          >All on GitHub â†—</a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

