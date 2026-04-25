"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo, experience } from "@/data";

export default function AboutSection() {
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

  const stats = [
    { value: "1+", label: "Years Flutter" },
    { value: "5+", label: "Apps Shipped" },
    { value: "100%", label: "GetX State" },
    { value: "Lots", label: "Coffee Cups" },
  ];

  return (
    <section ref={ref} id="about" style={{ padding: "80px 5vw", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "16px", marginBottom: "60px",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>02</span>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>About</span>
      </div>

      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
        {/* Left */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-30px)",
          transition: "all 0.7s 0.1s ease",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: "800", letterSpacing: "-0.04em", lineHeight: "1", marginBottom: "24px",
          }}>
            Building apps that{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: "300", color: "var(--accent)" }}>just work.</span>
          </h2>

          <p style={{
            fontFamily: "var(--font-serif)", fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: "300", fontStyle: "italic", color: "var(--text-muted)",
            lineHeight: "1.8", marginBottom: "20px",
          }}>
            I'm a Flutter developer based in {personalInfo.location}, focused on building mobile applications
            with clean architecture and intuitive user experiences.
          </p>

          <p style={{
            fontFamily: "var(--font-display)", fontSize: "15px",
            color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "32px",
          }}>
            I specialize in GetX state management, repository patterns, and REST API integration using Dio.
            Currently building logistics tracking and enterprise biometric apps.
          </p>

          <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "20px" }}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "28px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.1em", marginBottom: "4px" }}>{exp.period}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "16px", marginBottom: "2px" }}>{exp.role}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>{exp.company}</div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.7" }}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(30px)",
          transition: "all 0.7s 0.2s ease",
        }}>
          <div style={{ position: "relative", marginBottom: "32px" }}>
            <div style={{
              width: "100%", aspectRatio: "4/3",
              background: "var(--bg-3)", borderRadius: "16px",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", position: "relative",
            }}>
              <pre style={{
                fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.5vw, 13px)",
                color: "var(--text-dim)", lineHeight: "1.8", textAlign: "left", padding: "24px",
              }}>{`class Roshan extends Developer {
  final String passion = 'Flutter';
  final String location = 'India';
  
  List<String> get stack => [
    'Dart', 'GetX',
    'Clean Arch', 'REST APIs',
  ];
  
  bool get available => true;
}`}</pre>
              <div style={{
                position: "absolute", top: 0, right: 0, width: "200px", height: "200px",
                background: "radial-gradient(circle, rgba(100,200,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            </div>
            <div style={{
              position: "absolute", bottom: "-12px", right: "-12px",
              width: "60px", height: "60px", border: "2px solid var(--accent)",
              borderRadius: "10px", opacity: 0.3,
            }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{
                background: "var(--bg-2)", border: "1px solid var(--border)",
                borderRadius: "12px", padding: "20px", transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(100,200,255,0.3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: "800", color: "var(--accent)", letterSpacing: "-0.03em",
                  lineHeight: "1", marginBottom: "4px",
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}