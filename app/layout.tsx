import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/Noiseoverlay";


export const metadata: Metadata = {
  title: "Roshan | Flutter Developer",
  description: "Flutter & Mobile Developer based in Navi Mumbai, India. Building production-grade apps with GetX, clean architecture, and Dart.",
  keywords: ["Flutter", "Dart", "Mobile Developer", "India", "GetX"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}