import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Atom, Briefcase, Shield } from "lucide-react";
import { HiringModal } from "./hiring-modal";
import { AdminLoginModal } from "./admin-login-modal";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", section: "home" },
    { href: "/#about", label: "About", section: "about" },
    { href: "/#research", label: "Research", section: "research" },
    { href: "/#contact", label: "Contact", section: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Atom className="h-8 w-8 text-corporate-blue mr-2" />
                <h1 className="text-2xl font-bold text-corporate-blue">
                  Trident Research
                </h1>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <button
                      key={item.section}
                      onClick={() => scrollToSection(item.section)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location === "/" && item.section === "home"
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-corporate-blue"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsHiringModalOpen(true)}
                className="bg-corporate-blue hover:bg-corporate-blue/90 text-white"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Hiring
              </Button>
              <Button
                onClick={() => setIsAdminModalOpen(true)}
                variant="secondary"
                className="bg-slate-gray hover:bg-slate-gray/90 text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="block w-full text-left px-3 py-2 text-gray-500 hover:text-corporate-blue"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <HiringModal 
        isOpen={isHiringModalOpen} 
        onClose={() => setIsHiringModalOpen(false)} 
      />
      <AdminLoginModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </>
  );
}
