"use client";
import { skills } from "@/data";
import { useEffect, useRef, useState } from "react";


export default function SkillsSection() {
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

  const accentColors = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "#fbbf24"];

  return (
    <section ref={ref} id="skills" style={{
      padding: "120px 5vw",
      background: "var(--bg-2)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "16px", marginBottom: "80px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>03</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Skills</span>
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: "800",
          letterSpacing: "-0.04em",
          lineHeight: "1",
          marginBottom: "72px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s 0.1s ease",
        }}>
          Tools of the <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: "300", color: "var(--accent-3)" }}>craft.</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {skills.map((group, gi) => (
            <div key={group.category} style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(30px)",
              transition: `all 0.6s ${0.1 + gi * 0.08}s ease`,
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = accentColors[gi % accentColors.length];
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${accentColors[gi % accentColors.length]}, transparent)`,
              }} />

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: accentColors[gi % accentColors.length],
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}>0{gi + 1}</div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}>{group.category}</h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.map((item) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "var(--bg-3)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    letterSpacing: "0.03em",
                    transition: "all 0.15s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLSpanElement).style.color = "var(--text)";
                      (e.currentTarget as HTMLSpanElement).style.borderColor = accentColors[gi % accentColors.length];
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLSpanElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--border)";
                    }}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "80px",
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "20px 0",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s 0.4s ease",
        }}>
          <div style={{
            display: "flex",
            gap: "48px",
            animation: "marquee 20s linear infinite",
            whiteSpace: "nowrap",
          }}>
            {[...skills.flatMap(g => g.items), ...skills.flatMap(g => g.items)].map((item, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--text-dim)",
                letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                {item}
                <span style={{ color: "var(--accent)", opacity: 0.4 }}>&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}