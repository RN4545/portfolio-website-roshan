"use client";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data";

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const domainColors: Record<string, string> = {
    Logistics: "var(--accent)",
    Fintech: "var(--accent-2)",
  };

  return (
    <section ref={ref} id="experience" style={{
      padding: "80px 5vw", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,200,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Label */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px", marginBottom: "60px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>04</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Experience</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: "800", letterSpacing: "-0.04em", lineHeight: "1", marginBottom: "48px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s 0.1s ease",
        }}>
          Where I've <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: "300", color: "var(--accent)" }}>worked.</span>
        </h2>

        {/* Tab selectors */}
        <div style={{
          display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s 0.2s ease",
        }}>
          {experience.map((exp, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} style={{
              fontFamily: "var(--font-mono)", fontSize: "12px", padding: "8px 20px",
              borderRadius: "8px",
              border: `1px solid ${activeIdx === i ? domainColors[exp.domain] ?? "var(--accent)" : "var(--border)"}`,
              background: activeIdx === i ? `${domainColors[exp.domain] ?? "var(--accent)"}15` : "transparent",
              color: activeIdx === i ? (domainColors[exp.domain] ?? "var(--accent)") : "var(--text-muted)",
              cursor: "pointer", letterSpacing: "0.08em", transition: "all 0.2s ease",
            }}>
              {exp.company.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main content - responsive grid */}
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Left: Timeline */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-30px)",
            transition: "all 0.7s 0.2s ease",
          }}>
            <div style={{ position: "relative", paddingLeft: "32px" }}>
              <div style={{
                position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "1px",
                background: "linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)",
                opacity: 0.3,
              }} />

              {experience.map((exp, i) => {
                const color = domainColors[exp.domain] ?? "var(--accent)";
                const isActive = activeIdx === i;
                return (
                  <div key={i} onClick={() => setActiveIdx(i)} style={{
                    position: "relative",
                    marginBottom: i < experience.length - 1 ? "24px" : "0",
                    cursor: "pointer", padding: "20px", borderRadius: "14px",
                    border: `1px solid ${isActive ? color + "40" : "var(--border)"}`,
                    background: isActive ? `${color}08` : "transparent",
                    transition: "all 0.3s ease",
                  }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = color + "30";
                        (e.currentTarget as HTMLDivElement).style.background = `${color}05`;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLDivElement).style.background = "transparent";
                      }
                    }}
                  >
                    <div style={{
                      position: "absolute", left: "-28px", top: "24px",
                      width: "14px", height: "14px", borderRadius: "50%",
                      background: isActive ? color : "var(--bg-3)",
                      border: `2px solid ${color}`,
                      boxShadow: isActive ? `0 0 12px ${color}60` : "none",
                      transition: "all 0.3s ease",
                    }} />

                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontFamily: "var(--font-mono)", fontSize: "10px", color: color,
                      background: `${color}15`, border: `1px solid ${color}30`,
                      padding: "3px 10px", borderRadius: "100px",
                      letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px",
                    }}>
                      <span style={{
                        width: "5px", height: "5px", borderRadius: "50%", background: color,
                        ...(exp.period.includes("Present") ? { animation: "pulse-glow 2s infinite" } : {}),
                      }} />
                      {exp.domain}{exp.period.includes("Present") && " · Active"}
                    </div>

                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(14px, 2vw, 18px)",
                      fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "4px",
                      color: isActive ? "var(--text)" : "var(--text-muted)", transition: "color 0.2s",
                    }}>{exp.role}</div>

                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: color, marginBottom: "6px", opacity: 0.8 }}>{exp.company}</div>

                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.06em" }}>{exp.period}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detail panel */}
          {experience[activeIdx] && (() => {
            const exp = experience[activeIdx];
            const color = domainColors[exp.domain] ?? "var(--accent)";
            return (
              <div key={activeIdx} style={{
                background: "var(--bg-2)", border: `1px solid ${color}30`,
                borderRadius: "20px", padding: "clamp(20px, 4vw, 36px)",
                opacity: visible ? 1 : 0,
                transition: "all 0.5s ease",
                position: "sticky", top: "100px",
              }}>
                <div style={{
                  height: "2px",
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                  borderRadius: "2px", marginBottom: "24px",
                }} />

                <div style={{ marginBottom: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px", color: "var(--text)",
                  }}>{exp.role}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: color }}>
                    {exp.company} · {exp.period}
                  </div>
                </div>

                <p style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(14px, 1.5vw, 16px)",
                  fontWeight: "300", fontStyle: "italic", color: "var(--text-muted)",
                  lineHeight: "1.8", marginBottom: "24px", paddingBottom: "24px",
                  borderBottom: "1px solid var(--border)",
                }}>{exp.desc}</p>

                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)",
                    letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px",
                  }}>Key Contributions</div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {exp.highlights.map((h: string, i: number) => (
                      <li key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: "12px",
                        fontFamily: "var(--font-display)", fontSize: "14px",
                        color: "var(--text-muted)", lineHeight: "1.6",
                        animation: `fadeUp 0.4s ${i * 0.06}s ease both`,
                      }}>
                        <span style={{
                          width: "6px", height: "6px", borderRadius: "50%", background: color,
                          flexShrink: 0, marginTop: "7px", boxShadow: `0 0 6px ${color}60`,
                        }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}