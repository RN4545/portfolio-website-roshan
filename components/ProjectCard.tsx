"use client";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    color: string;
    year: string;
    type: string;
  };
  index: number;
  visible: boolean;
}

export default function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: "var(--bg-2)",
      border: `1px solid ${hovered ? project.color + "40" : "var(--border)"}`,
      borderRadius: "20px",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? (hovered ? "translateY(-6px)" : "none") : "translateY(40px)",
      transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.3s ease, border-color 0.3s`,
      cursor: "pointer",
      position: "relative",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top preview area */}
      <div style={{
        height: "220px",
        background: `linear-gradient(135deg, ${project.color}10 0%, ${project.color}05 100%)`,
        borderBottom: `1px solid ${hovered ? project.color + "30" : "var(--border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          width: "300px", height: "300px", borderRadius: "50%",
          border: `1px solid ${project.color}20`,
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.5s ease",
        }} />
        <div style={{
          position: "absolute",
          width: "200px", height: "200px", borderRadius: "50%",
          border: `1px solid ${project.color}30`,
          transform: hovered ? "scale(1.15)" : "scale(1)",
          transition: "transform 0.5s 0.05s ease",
        }} />
        {/* Project initial */}
        <div style={{
          width: "72px", height: "72px",
          borderRadius: "18px",
          background: `${project.color}15`,
          border: `2px solid ${project.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: "800",
          color: project.color,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
          zIndex: 1,
        }}>
          {project.title.charAt(0)}
        </div>

        {/* Type badge */}
        <div style={{
          position: "absolute", top: "16px", right: "16px",
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: project.color,
          background: `${project.color}15`,
          border: `1px solid ${project.color}30`,
          padding: "4px 10px", borderRadius: "100px",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>{project.type}</div>

        {/* Year */}
        <div style={{
          position: "absolute", bottom: "16px", left: "16px",
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-dim)",
        }}>{project.year}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: "-0.02em",
          marginBottom: "10px",
          color: hovered ? project.color : "var(--text)",
          transition: "color 0.2s",
        }}>{project.title}</h3>

        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "14px",
          color: "var(--text-muted)",
          lineHeight: "1.7",
          marginBottom: "20px",
        }}>{project.description}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              padding: "3px 10px",
              borderRadius: "4px",
              background: "var(--bg-3)",
              color: "var(--text-dim)",
              letterSpacing: "0.05em",
            }}>{tag}</span>
          ))}
        </div>

       
      </div>
    </div>
  );
}

