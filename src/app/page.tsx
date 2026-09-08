import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import NicheFocus from "@/components/NicheFocus";
import Framework from "@/components/Framework";
import ValueBanner from "@/components/ValueBanner";
import AboutSection from "@/components/AboutSection";
import RoiEstimator from "@/components/RoiEstimator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <ClientLogos />
        <Services />
        <NicheFocus />
        <Framework />
        <ValueBanner />
        <AboutSection />
        <RoiEstimator />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
