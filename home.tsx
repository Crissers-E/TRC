import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { HiringModal } from "@/components/hiring-modal";
import { 
  Atom, 
  FlaskRound, 
  Users, 
  ServerCog, 
  Dna, 
  Bot, 
  Satellite, 
  Rocket, 
  Microscope,
  PlaneTakeoff
} from "lucide-react";

export default function Home() {
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            className="absolute inset-0 opacity-20"
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Trident Research Corporation
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Pioneering advanced research and development in cutting-edge technologies. 
                Join our elite team of scientists and researchers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsHiringModalOpen(true)}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Join Our Team
                </Button>
                <Button
                  onClick={() => scrollToSection("about")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                >
                  <Microscope className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Leading Innovation in Research
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our corporation stands at the forefront of technological advancement, 
                pushing the boundaries of what's possible.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-4xl mb-4">
                  <FlaskRound className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Advanced Research</h3>
                <p className="text-gray-600">
                  Conducting groundbreaking research in multiple scientific disciplines 
                  with state-of-the-art equipment and methodologies.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-4xl mb-4">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
                <p className="text-gray-600">
                  Our team consists of world-class scientists, engineers, and researchers 
                  dedicated to pushing the boundaries of knowledge.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-4xl mb-4">
                  <ServerCog className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation Hub</h3>
                <p className="text-gray-600">
                  A collaborative environment where creativity meets scientific rigor, 
                  fostering breakthrough discoveries and technological advances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section id="research" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Research Divisions
              </h2>
              <p className="text-xl text-gray-600">
                Explore our specialized research departments and their cutting-edge projects.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-3xl mb-3">
                  <Atom className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Quantum Physics</h3>
                <p className="text-gray-600 text-sm">Advanced quantum mechanics research and applications</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-3xl mb-3">
                  <Dna className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Biotechnology</h3>
                <p className="text-gray-600 text-sm">Genetic engineering and biological systems</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-3xl mb-3">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">AI & Robotics</h3>
                <p className="text-gray-600 text-sm">Artificial intelligence and autonomous systems</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-corporate-blue text-3xl mb-3">
                  <Satellite className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Space Tech</h3>
                <p className="text-gray-600 text-sm">Aerospace engineering and space exploration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Join Our Mission?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Be part of groundbreaking research that shapes the future of technology.
              </p>
              <Button
                onClick={() => setIsHiringModalOpen(true)}
                size="lg"
                className="bg-corporate-blue hover:bg-corporate-blue/90 text-lg px-8 py-4"
              >
                <PlaneTakeoff className="h-5 w-5 mr-2" />
                Apply Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <HiringModal 
        isOpen={isHiringModalOpen} 
        onClose={() => setIsHiringModalOpen(false)} 
      />
    </>
  );
}
