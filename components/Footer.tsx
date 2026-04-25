"use client";
import { personalInfo } from "@/data";

export default function Footer() {
  return (
    <footer style={{
      padding: "40px 5vw",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "28px", height: "28px", border: "2px solid var(--accent)",
          borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)",
        }}>R</div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--text-muted)" }}>
          {personalInfo.name} — {new Date().getFullYear()}
        </span>
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {[
          { label: "GitHub", href: personalInfo.github },
          { label: "LinkedIn", href: personalInfo.linkedin },
          { label: "Email", href: `mailto:${personalInfo.email}` },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)",
            letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
          >{link.label}</a>
        ))}
      </div>

     <span
  style={{
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--text-dim)",
    letterSpacing: "0.05em"
  }}
>
  Crafted with Passion & Clean Code
</span>
    </footer>
  );
}