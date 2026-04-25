import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/projectSection";
import ExperienceSection from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection/>
      <ProjectsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}

