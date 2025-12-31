import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail, Phone, Linkedin, Github, MapPin, ExternalLink, Download, ChevronRight,
  // Tech Stack Icons
  Atom, Database, Coffee, Wind, Layers, CloudSun, PieChart, FileCode, Leaf,
  // New Icons for Categories
  LayoutDashboard, Server, Cloud, ShieldCheck, Globe, Code2, Terminal, GitBranch, Code,
  // New Icons for Slideshow
  GraduationCap, FolderGit, Award,
  // Specific Icons for IDEs (using Lucide proxies)
  AppWindow, Smartphone
} from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Slide state for the rotating cube
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    // 1. Initialize Particles
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // 2. Loading Screen Timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    // 3. Carousel Rotation Interval
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    // 4. NEW: Scroll Spy Logic (Highlights Nav on Scroll)
    const handleScroll = () => {
      const sections = ['about', 'education', 'tech', 'projects', 'certificates', 'contact'];
      // We add 300px offset so it highlights the section *before* it hits the very top
      const scrollPosition = window.scrollY + 300;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    // Attach the scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll); // Clean up the scroll listener
    };
  }, []);

  const options = useMemo(
      () => ({
        fpsLimit: 120,
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
        },
        particles: {
          color: { value: "#ffffff" },
          links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
          move: { enable: true, speed: 0.8 },
          number: { density: { enable: true, area: 800 }, value: 80 },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }),
      [],
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // --- CONFIGURATION FOR ALL TECH PILLS ---
  const getTechConfig = (tech) => {
    const t = tech.toLowerCase();

    const config = {
      // Frontend
      "react": { icon: Atom, color: "text-blue-400", bg: "bg-[#0B1929]", border: "border-blue-500/30" },
      "tailwind": { icon: Wind, color: "text-cyan-400", bg: "bg-[#081A1E]", border: "border-cyan-500/30" },
      "html": { icon: Code2, color: "text-orange-500", bg: "bg-[#1F120A]", border: "border-orange-500/30" },
      "css": { icon: FileCode, color: "text-blue-300", bg: "bg-[#0A1520]", border: "border-blue-400/30" },
      "javascript": { icon: FileCode, color: "text-yellow-400", bg: "bg-[#1F1D0B]", border: "border-yellow-500/30" },
      "bootstrap": { icon: LayoutDashboard, color: "text-purple-500", bg: "bg-[#150A1F]", border: "border-purple-500/30" },

      // Backend
      "spring boot": { icon: Leaf, color: "text-green-400", bg: "bg-[#0A1F12]", border: "border-green-500/30" },
      "java": { icon: Coffee, color: "text-red-400", bg: "bg-[#1F0A0A]", border: "border-red-500/30" },
      "node.js": { icon: Server, color: "text-green-500", bg: "bg-[#0A1F10]", border: "border-green-600/30" },
      "php": { icon: FileCode, color: "text-indigo-400", bg: "bg-[#0F0A1F]", border: "border-indigo-500/30" },
      "python": { icon: Server, color: "text-blue-400", bg: "bg-[#0A1525]", border: "border-blue-500/30" },
      "django": { icon: Layers, color: "text-emerald-400", bg: "bg-[#061F10]", border: "border-emerald-500/30" },

      // Database
      "mysql": { icon: Database, color: "text-orange-400", bg: "bg-[#1F120A]", border: "border-orange-500/30" },
      "postgresql": { icon: Database, color: "text-blue-300", bg: "bg-[#0A1520]", border: "border-blue-400/30" },
      "sqlite": { icon: Database, color: "text-sky-400", bg: "bg-[#0A1820]", border: "border-sky-500/30" },
      "mongodb": { icon: Database, color: "text-green-500", bg: "bg-[#051F0A]", border: "border-green-500/30" },
      "firebase": { icon: Database, color: "text-amber-500", bg: "bg-[#1F1500]", border: "border-amber-500/30" },

      // Tools & Cloud
      "aws": { icon: Cloud, color: "text-yellow-500", bg: "bg-[#1F180A]", border: "border-yellow-600/30" },
      "vercel": { icon: Cloud, color: "text-white", bg: "bg-neutral-800", border: "border-neutral-600" },
      "git": { icon: GitBranch, color: "text-red-500", bg: "bg-[#1F0A0A]", border: "border-red-500/30" },
      "github": { icon: Github, color: "text-white", bg: "bg-neutral-800", border: "border-neutral-600" },
      "servicenow": { icon: Cloud, color: "text-teal-400", bg: "bg-[#081A1E]", border: "border-teal-500/30" },
      "render": { icon: Cloud, color: "text-cyan-400", bg: "bg-[#081A1E]", border: "border-cyan-500/30" },
      "railway": { icon: Cloud, color: "text-purple-400", bg: "bg-[#1A0B2E]", border: "border-purple-500/30" },
      "kotlin": { icon: Smartphone, color: "text-purple-400", bg: "bg-[#1A0B2E]", border: "border-purple-500/30" },

      // QA & Others
      "javafx": { icon: Layers, color: "text-purple-400", bg: "bg-[#150A1F]", border: "border-purple-500/30" },
      "selenium": { icon: ShieldCheck, color: "text-green-500", bg: "bg-[#0A1F12]", border: "border-green-500/30" },
      "junit": { icon: ShieldCheck, color: "text-red-400", bg: "bg-[#1F0A0A]", border: "border-red-500/30" },
      "manual testing": { icon: ShieldCheck, color: "text-teal-400", bg: "bg-[#081A1E]", border: "border-teal-500/30" },
      "testrail": { icon: ShieldCheck, color: "text-emerald-400", bg: "bg-[#0A1F12]", border: "border-emerald-500/30" },
      "openweather api": { icon: CloudSun, color: "text-yellow-400", bg: "bg-[#1F1D0B]", border: "border-yellow-500/30" },
      "chart.js": { icon: PieChart, color: "text-pink-400", bg: "bg-[#1F0A15]", border: "border-pink-500/30" },
      "testlink": { icon: ShieldCheck, color: "text-lime-500", bg: "bg-[#131F0A]", border: "border-lime-500/30" },

      // --- NEW: IDEs & Tools ---
      "vs code": { icon: Code, color: "text-blue-400", bg: "bg-[#0B1929]", border: "border-blue-500/30" },
      "intellij idea": { icon: AppWindow, color: "text-pink-500", bg: "bg-[#1F0A15]", border: "border-pink-500/30" },
      "cursor": { icon: Terminal, color: "text-white", bg: "bg-neutral-800", border: "border-neutral-600" },
      "android studio": { icon: Smartphone, color: "text-green-400", bg: "bg-[#0A1F12]", border: "border-green-500/30" },
      "eclipse": { icon: AppWindow, color: "text-indigo-400", bg: "bg-[#0F0A1F]", border: "border-indigo-500/30" },
    };

    return config[t] || { icon: Terminal, color: "text-neutral-400", bg: "bg-neutral-900", border: "border-neutral-800" };
  };

  const skillCategories = [
    {
      title: "Frontend",
      icon: LayoutDashboard,
      skills: ["React", "Tailwind", "HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Java", "Spring Boot", "Node.js", "PHP"]
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MySQL", "SQLite", "PostgreSQL" , "mongodb" , "firebase"]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS", "Vercel", "Git", "GitHub", "ServiceNow", "Render" , "Railway"]
    },
    {
      title: "QA & Testing",
      icon: ShieldCheck,
      skills: ["testlink", "Manual Testing", "TestRail"]
    },
    {
      title: "IDEs & Tools",
      icon: Code,
      skills: ["VS Code", "IntelliJ IDEA", "Cursor", "Android Studio", "Eclipse"]
    }
  ];

  const projects = [
    {
      title: "WildCats CircuitHub",
      subtitle: "Equipment Borrowing System",
      description: "A comprehensive web-based equipment management system for tracking and managing laboratory equipment, built with React + Vite frontend and Spring Boot backend.",
      tech: ["React", "Spring Boot", "Firebase", "css" , "html" , "javascript"],
      image: "/images/circuithub.png",
      githubLink: "https://github.com/ElReyDeLosGorditos/WildCats-CircuitHub",
      liveLink: "https://wildcats-circuit-hub.vercel.app"
    },
    {
      title: "EduWheels",
      subtitle: "School Vehicle Management System",
      description: "EduWheels is a comprehensive School Vehicle Management System designed to provide a systematic and efficient way of managing school vehicles. It includes optimized features that assist in vehicle management." ,
      tech: ["React", "Spring Boot", "CSS" ,  "html", "javascript", "Kotlin"],
      image: "/images/eduwheels.png",
      githubLink: "https://github.com/JeckTupir/IT342-EduWheels",
      liveLink: "#" // Ensure links that aren't ready are marked as "#"
    },
    {
      title: "BCD Car Rental System",
      subtitle: "Web-based Car Rental Management",
      description: "A convenient and user-friendly web-based platform to rent cars with ease. BCD Car Rental offers a seamless experience for browsing, selecting, and booking vehicles for any occasion.",
      tech: ["Html", "Css", "Python"],
      image: "/images/bcd.png",
      githubLink: "https://github.com/Amarok1214/BCD",
      liveLink: "#"
    }
  ];

  // Updated Certificates Data with Image Paths
  // NOTE: You need to add these images to your /public/images/ folder
  const certificates = [
    {
      title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
      issuer: "AWS",
      year: "2025",
      color: "from-orange-500 to-red-500",
      // Replace with your actual image path
      image: "/images/cloudfoundations.png"
    },
    {
      title: "AWS Academy Graduate - Cloud Architecting - Training Badge",
      issuer: "AWS",
      year: "2025",
      color: "from-cyan-400 to-blue-500",
      // Replace with your actual image path
      image: "/images/cloudarchitecting.png"
    },
    {
      title: "UXPH Participation",
      issuer: "UXPH",
      year: "2025",
      color: "from-purple-500 to-pink-500",
      // Replace with your actual image path
      image: "/images/uxph.png"
    }
  ];

  const SectionHeader = ({ title, number }) => (
      <div className="relative mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-cyan-500"></span>
          {title}
        </h2>
        <div className="absolute -top-10 -left-6 text-9xl font-bold text-neutral-800/50 -z-0 select-none">
          {number}
        </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300 relative selection:bg-cyan-500/30 selection:text-cyan-200">

        {/* Intro Overlay */}
        <div
            className={`fixed inset-0 bg-neutral-950 z-[100] flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out ${
                isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter flex items-center gap-2">
              <span className="text-cyan-500">{'{'}</span>
              <span>SYSTEM_INIT</span>
              <span className="text-cyan-500">{'}'}</span>
            </div>
            <div className="w-64 h-1 bg-neutral-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-cyan-500 animate-[loading_2s_ease-in-out_forwards]"></div>
            </div>
            <div className="text-center mt-4 font-mono text-cyan-500 text-sm animate-pulse">
              LOADING ASSETS...
            </div>
          </div>
          <style>{`@keyframes loading { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }`}</style>
        </div>

        {/* Background Particles */}
        {init && (
            <Particles id="tsparticles" className="absolute inset-0 z-0 fixed" options={options} />
        )}

        {/* Foreground Content */}
        <div className="relative z-10">

          {/* Navigation */}
          <nav className="sticky top-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white tracking-tight">Xyrill <span className="text-cyan-400">Canete</span></h1>
              <div className="hidden md:flex gap-8">
                {['about', 'education', 'tech', 'projects', 'certificates', 'contact'].map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`capitalize text-sm font-medium transition-all duration-300 ${
                            activeSection === section ? 'text-cyan-400 scale-105' : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                      {section === 'tech' ? 'Technologies' : section}
                    </button>
                ))}
              </div>
            </div>
          </nav>

          {/* 1. ABOUT SECTION */}
          <section id="about" className="relative pt-20 pb-32">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1 space-y-8 animate-[fadeIn_1s_ease-out_1s_both]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                    Available for Internship
                  </div>

                  <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Crafting digital <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">experiences.</span>
                  </h2>

                  <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                    As a graduating IT major, I bring hands-on experience in building web applications, managing backend logic, and executing rigorous system tests. I am eager to apply my technical problem-solving skills to real-world challenges and contribute immediately to a development team.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-neutral-950 font-bold rounded-full transition-all flex items-center gap-2">
                      View Work <ChevronRight size={18} />
                    </button>
                    <a
                        href="/resume.pdf"
                        download="Xyrill_Dereck_Canete_Resume.pdf"
                        className="px-8 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-medium rounded-full transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Download Resume <Download size={18}/>
                    </a>
                  </div>
                </div>

                {/* ROTATING CUBE / CAROUSEL */}
                <div className="w-full md:w-1/3 aspect-square relative group animate-[fadeIn_1s_ease-out_1.5s_both]">
                  <div
                      className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative h-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl overflow-hidden">

                    {/* SLIDE 0: PROFILE PHOTO */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <img
                          src="/images/profilepic.png"
                          alt="Profile"
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
                        <div className="text-cyan-400 font-mono text-sm mb-1">// HELLO_WORLD</div>
                        <div className="text-white font-bold text-xl">Xyrill Dereck N. Canete</div>
                      </div>
                    </div>

                    {/* SLIDE 1: TECH STACK */}
                    <div className={`absolute inset-0 p-8 flex flex-col justify-center gap-6 transition-opacity duration-1000 ease-in-out ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <div className="flex justify-between text-neutral-500 font-mono text-sm">
                        <span>01</span>
                        <span>// TECH STACK</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Display Top 3 Skills */}
                        {['Java', 'React', 'Spring'].map((tech) => {
                          const { icon: Icon, color, bg, border } = getTechConfig(tech === 'Spring' ? 'Spring Boot' : tech);
                          return (
                              <div key={tech} className={`p-3 rounded-lg border text-center font-medium flex items-center justify-center gap-2 ${bg} ${border} ${color}`}>
                                <Icon size={16} />
                                {tech}
                              </div>
                          );
                        })}

                        {/* The "More" Indicator occupying the 4th slot */}
                        <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-500 text-center font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-default">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse delay-75"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse delay-150"></span>
                          </div>
                          <span className="text-xs uppercase tracking-widest">More</span>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE 2: EDUCATION */}
                    <div className={`absolute inset-0 p-8 flex flex-col justify-center gap-4 transition-opacity duration-1000 ease-in-out ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <div className="flex justify-between text-neutral-500 font-mono text-sm mb-2">
                        <span>02</span>
                        <span>// EDUCATION</span>
                      </div>
                      <div className="bg-[#111] p-4 rounded-xl border border-neutral-800 flex flex-col gap-2">
                        <GraduationCap className="text-cyan-400 mb-2" size={28} />
                        <div className="font-bold text-white">BS Information Technology</div>
                        <div className="text-sm text-neutral-400">Cebu Institute of Technology - University</div>
                      </div>
                      <div className="text-center text-xs text-neutral-500 mt-2">Graduating Class of 2026</div>
                    </div>

                    {/* SLIDE 3: PROJECTS */}
                    <div className={`absolute inset-0 p-8 flex flex-col justify-center gap-4 transition-opacity duration-1000 ease-in-out ${currentSlide === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <div className="flex justify-between text-neutral-500 font-mono text-sm mb-2">
                        <span>03</span>
                        <span>// LATEST WORK</span>
                      </div>
                      <div className="bg-[#111] p-4 rounded-xl border border-neutral-800">
                        <FolderGit className="text-purple-400 mb-2" size={28} />
                        <div className="font-bold text-white mb-1">WildCats CircuitHub</div>
                        <div className="text-xs text-neutral-400">Fullstack Equipment Borrowing System</div>
                        <div className="flex gap-2 mt-3">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        </div>
                      </div>
                    </div>

                    {/* SLIDE 4: CERTIFICATES */}
                    <div className={`absolute inset-0 p-6 flex flex-col justify-center gap-3 transition-opacity duration-1000 ease-in-out ${currentSlide === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <div className="flex justify-between text-neutral-500 font-mono text-xs mb-1">
                        <span>04</span>
                        <span>// CERTIFICATIONS</span>
                      </div>

                      {/* Cert 1: AWS Foundations */}
                      <div className="bg-[#111] p-3 rounded-lg border border-neutral-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 shrink-0">
                          <Cloud size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-xs leading-tight truncate">AWS Cloud Foundations</div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">AWS Academy Graduate</div>
                        </div>
                      </div>

                      {/* Cert 2: AWS Architecting */}
                      <div className="bg-[#111] p-3 rounded-lg border border-neutral-800 flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0">
                          <Cloud size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-xs leading-tight truncate">AWS Cloud Architecting</div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">AWS Academy Graduate</div>
                        </div>
                      </div>

                      {/* Cert 3: UXPH */}
                      <div className="bg-[#111] p-3 rounded-lg border border-neutral-800 flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shrink-0">
                          <Award size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-xs leading-tight truncate">UXPH Participation</div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">User Experience Philippines</div>
                        </div>
                      </div>
                    </div>

                    {/* CAROUSEL INDICATORS (DOTS) */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                      {[...Array(totalSlides)].map((_, idx) => (
                          <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-cyan-400 w-4' : 'bg-neutral-600'}`}
                          ></div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. EDUCATION SECTION */}
          <section id="education" className="py-24 bg-neutral-900/30 backdrop-blur-sm border-y border-neutral-800">
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader title="Education" number="01" />
              <div className="bg-neutral-950/50 border border-neutral-800 rounded-2xl p-8 md:p-12 hover:border-cyan-500/30 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-cyan-500/10"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Bachelor of Science in Information Technology</h3>
                    <p className="text-cyan-400 text-lg mt-2 font-medium">Cebu Institute of Technology - University</p>
                    <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">
                      Focused on software engineering principles for frontend and backend development, as well as system architecture. Possesses fundamental experience with ServiceNow, blockchain, Quality Assurance, and AWS.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-3xl font-bold text-white">2022-26</div>
                    <div className="text-neutral-500 text-sm mt-1">Expected Graduation</div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. TECHNOLOGIES SECTION */}
          <section id="tech" className="py-32">
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader title="Technologies" number="02" />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, index) => (
                    <div key={index} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-neutral-800 rounded-xl text-cyan-400 group-hover:text-white transition-colors">
                          <category.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => {
                          const { icon: Icon, color, bg, border } = getTechConfig(skill);
                          return (
                              <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors ${bg} ${border} ${color}`}>
                                {Icon && <Icon size={14} />}
                                {skill}
                              </div>
                          );
                        })}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. PROJECTS SECTION */}
          <section id="projects" className="py-24 bg-neutral-900/30 backdrop-blur-sm border-y border-neutral-800">
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader title="Projects" number="03" />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="group flex flex-col bg-[#111] border border-neutral-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300">

                      {/* Image Area with Hover Overlay */}
                      <div className="h-48 overflow-hidden relative border-b border-neutral-800 group">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* THE HOVER OVERLAY WITH BUTTONS */}
                        <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 translate-y-4 group-hover:translate-y-0">
                          {project.githubLink && (
                              <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 bg-neutral-800 text-white rounded-full hover:bg-cyan-500 hover:text-neutral-950 transition-colors"
                                  title="View on GitHub"
                              >
                                <Github size={20} />
                              </a>
                          )}
                          {project.liveLink && project.liveLink !== "#" && (
                              <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 bg-neutral-800 text-white rounded-full hover:bg-cyan-500 hover:text-neutral-950 transition-colors"
                                  title="View Live Site"
                              >
                                <ExternalLink size={20} />
                              </a>
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow relative z-10 bg-[#111]">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-cyan-400 mb-1">{project.title}</h3>
                          <p className="text-sm font-medium text-neutral-500">{project.subtitle}</p>
                        </div>

                        <p className="text-neutral-400 text-sm mb-6 leading-relaxed flex-grow">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((t, i) => {
                            const { color, bg, border } = getTechConfig(t);
                            return (
                                <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${bg} ${border} ${color}`}>
                            {t}
                          </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. CERTIFICATES SECTION - ALWAYS VISIBLE IMAGES */}
          <section id="certificates" className="py-32">
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader title="Certificates" number="04" />

              <div className="grid md:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                    <div key={index} className="relative overflow-hidden bg-neutral-950/50 border border-neutral-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 group flex flex-col">

                      {/* IMAGE AREA - Now visible by default at the top */}
                      <div className="h-48 w-full relative overflow-hidden border-b border-neutral-800">
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${cert.color} opacity-20 mix-blend-overlay`}></div>
                      </div>

                      {/* TEXT CONTENT - Always visible below */}
                      <div className="p-6 flex flex-col justify-between flex-grow bg-[#111]">
                        <div>
                          <h3 className="font-bold text-white text-lg leading-tight mb-2">{cert.title}</h3>
                          <span className="text-neutral-400 text-sm font-medium">{cert.issuer}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-center">
                          <span className="text-xs text-neutral-500">Issued</span>
                          <span className="text-cyan-400 font-mono text-sm">{cert.year}</span>
                        </div>
                      </div>

                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. CONTACT SECTION */}
          <section id="contact" className="py-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-white mb-8">Ready to start a project?</h2>
              <p className="text-neutral-400 mb-12 text-lg">
                I am currently looking for internship opportunities. <br />
                Feel free to reach out if you have a question or just want to say hi.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a href="mailto:canetedereck@gmail.com" className="group flex items-center justify-center gap-4 p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-cyan-500/50 transition-all w-full md:w-auto min-w-[250px]">
                  <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail size={32} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-neutral-500">Email Me</div>
                    <div className="text-white font-medium">canetedereck@gmail.com</div>
                  </div>
                </a>

                <a
                    href="https://www.linkedin.com/in/cañete-xyrill-dereck-1a4728321" // Added https:// here
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-4 p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-violet-500/50 transition-all w-full md:w-auto min-w-[250px]"
                >
                  <div
                      className="p-4 bg-violet-500/10 rounded-full text-violet-400 group-hover:scale-110 transition-transform">
                    <Linkedin size={32}/>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-neutral-500">Connect</div>
                    <div className="text-white font-medium">LinkedIn Profile</div>
                  </div>
                </a>
              </div>

              <div
                  className="mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
                <p>&copy; 2025 Xyrill Dereck N. Canete. All rights reserved.</p>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <MapPin size={14}/> Minglanilla, Cebu, Philippines
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
  );
}