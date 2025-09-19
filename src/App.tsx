// By Von Jared Castillo
// Bachelor of Science in Computer Engineering - Major in System and Network Administration
// Pangasinan State University - Urdaneta City Campus

import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import emailjs from "emailjs-com";

import {
  FaHtml5,
  FaJs,
  FaReact,
  FaPython,
  FaNodeJs,
  FaLinux,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
   FaPhp,
   FaBars,
   FaTimes,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiAdobephotoshop,
} from "react-icons/si";


import { motion, AnimatePresence } from "framer-motion";


const App: React.FC = () => {
  // NAV BAR AUTO SELECTION HOOKS
  const [activeSection, setActiveSection] = useState("home");

  // HAMBURGER ICON FOR 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  // CATEGORY & PRODUCTS HOOKS
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // INTRO HOOKS
  const [introText, setIntroText] = useState("Welcome!");
   const [showIntro, setShowIntro] = useState(true);

  // CONTACT FORM HOOKS
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // CONTACT FORM
  const handleContactSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs
    .send(
      "service_9epzr4w",   
      "template_w0ox4ks",  
      {
        name: contactName,
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage,
      },
      "Z0JpIBr-wqPvCKF9n"    
    )
    .then(
      () => {
        alert("Message sent successfully!");
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send. Please try again.");
      }
    );
};

  // Automatically Moving Hover in Navs
  useEffect(() => {
  const handleScroll = () => {
    const sections = ["home", "projects", "about", "services"];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Intro Duration and Animation of Text
  useEffect(() => {
    if (!showIntro) return;

    const messages = ["Welcome!", "I'm Von Jared Castillo", "Loading..."];
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setIntroText(messages[index]);
      }
    }, 3000);

    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showIntro]);
  
  const projects = [
    {
      id: 1,
      title: "Cookies & Cream Cafe",
      category: "websites",
      image: "./images/Cookies and Cream Cafe.png",
      tech: ["HTML", "Tailwind", "TypeScript"],
      description: "Responsive café website with modern design and smooth animations.",
      viewUrl: "https://von-devjs.github.io/leblanc-cafe",
      githubUrl: "https://github.com/von-devjs/leblanc-cafe",
    },
    {
      id: 2,
      title: "Leblanc Shoes Shop",
      category: "websites",
      image: "./images/Leblanc Shoes Shop.png",
      tech: ["HTML", "Tailwind", "TypeScript"],
      description: "Responsive shoe shop with modern UI and smooth interactions.",
      viewUrl: "https://von-devjs.github.io/leblanc-shoes",
      githubUrl: "https://github.com/von-devjs/leblanc-shoes",
    },
    {
      id: 3,
      title: "Dunkin' Donuts",
      category: "websites",
      image: "./images/Dunkin Donuts.png",
      tech: ["React", "Tailwind", "TypeScript"],
      description: "Dunkin' Donuts themed website with a responsive modern design.",
      viewUrl: "https://von-devjs.github.io/leblanc-dunkin",
      githubUrl: "https://github.com/von-devjs/leblanc-dunkin",
    },
    {
      id: 4,
      title: "LeBlanc Shoes Shop ft. Admin Dashboard",
      category: "full-stack",
      image: "./images/LeBlanc Shoes Shop - Full-Stack.jpg",
      tech: ["React", "TypeScript", "Tailwind", "PHP", "MySQL", "Node.js"],
      description: "Full-stack shoe shop with admin dashboard and database integration.",
      viewUrl:"https://von-devjs.github.io/leblanc-demo/",
      githubUrl:"https://github.com/von-devjs/leblanc-shoes-shop-full-stack",
    }
  ];
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

// Function to scroll to a section smoothly
const scrollToSection = (sectionId: string) => {
  setActiveSection(sectionId);

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  // Close mobile menu after clicking a link
  setMobileMenuOpen(false);
};

// Effect: lock/unlock background scroll when mobile menu is open
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden"; 
  } else {
    document.body.style.overflow = "auto";  
  }

  return () => {
    document.body.style.overflow = "auto";   
  };
}, [mobileMenuOpen]);

  
  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-80 h-80 mx-auto mb-8 rounded-full bg-black border-x border-y border-blue-900 shadow-lg shadow-indigo-600  flex items-center justify-center animate-pulse">
            <img
              src="./images/logo main.png"  
              alt="Logo"
              className="h-40 w-auto object-contain"
            />
          </div>
          <div className="text-2xl font-bold text-white transition-opacity duration-500 ease-in-out">
            {introText}
          </div>
        </div>
      </div>
    );
  }

 

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-700/80 via-black to-violet-900 text-white bg-fixed">
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-500 to-black text-white bg-fixed">

     <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-2">
            <img
              src="./images/logo main.png"  
              alt="Logo"
               className="h-15 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
              {["home", "projects", "about", "services"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors cursor-pointer text-base ${
                    activeSection === item
                      ? "text-violet-400"
                      : "text-white hover:text-violet-300"
                  }`}>{item}</button>
              ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-indigo-900 px-6 py-2 rounded-lg text-white font-medium hover:bg-purple-900 700 transition-all cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white cursor-pointer text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col mt-16 pt-5 pb-100 gap-6 pl-5 text-lg bg-black/40 backdrop-blur-lg">
          {["home", "projects", "about", "services"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-white hover:text-violet-300 transition-colors cursor-pointer text-left"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-indigo-900 px-4 py-2 rounded-lg text-white font-medium hover:from-violet-600 hover:to-purple-700 transition-all cursor-pointer w-fit"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="pt-5 text-center max-w-4xl mx-auto">
          <div className="w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-indigo-900">
            <img src="./images/DP.png" alt="Profile" className="w-full h-full object-cover object-top overflow-hidden"/>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
            FULL-STACK DEVELOPER
          </h1>

          <p className="text-xl md:text-2xl text-violet-300 mb-8">
            Creating modern web experiences with cutting-edge technologies
          </p>

          <div className="flex justify-center items-center space-x-5 mb-9">
            {/* REACT */}
            <div className="w-13 h-13 rounded-lg flex items-center justify-center">
              <i className="fab fa-react text-3xl text-blue-400 animate-spin-slow"></i>
            </div>

            {/* JAVASCRIPT */}
            <div className="w-13 h-13 rounded-lg flex items-center justify-center">
              <i className="fab fa-js-square text-3xl text-yellow-400"></i>
            </div>

            {/* TAILWIND */}
            <div className="w-13 h-13 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
              <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/>
              </svg>
            </div>

            {/* MYSQL */}
            <div className="w-13 h-13 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
              <path fill="#00796b" d="M0.002,35.041h1.92v-7.085l2.667,6.057c0.329,0.755,0.779,1.022,1.662,1.022 s1.315-0.267,1.644-1.022l2.667-5.902v6.93h1.92v-7.258c0-0.697-0.277-1.035-0.849-1.209c-1.367-0.43-2.285-0.059-2.7,0.872 l-2.735,6.16l-2.649-6.16c-0.398-0.93-1.332-1.302-2.7-0.872C0.277,26.748,0,27.085,0,27.782v7.258H0.002z"></path><path fill="#00796b" d="M13.441,29.281h1.92v4.055c-0.015,0.2,0.064,0.731,0.99,0.745c0.472,0.008,2.821,0,2.85,0v-4.8h1.92 c0.008,0,0,5.968,0,5.993c0.01,1.472-1.828,1.662-2.673,1.687h-5.006v-0.96c0.01,0,4.787,0.001,4.801,0 c1.088-0.115,0.959-0.714,0.959-0.896v-0.064H16.19c-1.67-0.015-2.735-0.751-2.747-1.59C13.441,33.373,13.479,29.317,13.441,29.281 z"></path><path fill="#f57f17" d="M22.081,35.041h4.807c0.63,0,1.242-0.132,1.728-0.36c0.81-0.372,1.144-0.875,1.144-1.536v-1.368 c0-1.476-1.83-1.536-2.88-1.536h-1.92c-0.755,0-0.87-0.456-0.96-0.96v-0.96c0.09-0.384,0.258-0.9,0.923-0.96 c0.773,0,4.836,0,4.836,0v-0.96h-4.566c-0.755,0-3.114,0.09-3.114,1.92v1.187c0,0.84,0.738,1.524,2.34,1.692 c0.18,0.012,0.36,0.024,0.539,0.024c0,0,1.866-0.036,1.92-0.024c1.08,0,0.96,0.84,0.96,0.96v0.96c0,0.132-0.03,0.96-0.971,0.96 c-0.072,0-4.789,0-4.789,0V35.041z"></path><path fill="#f57f17" d="M40.32,33.08c0,1.159,0.655,1.809,2.392,1.939c0.162,0.011,0.325,0.021,0.488,0.021H48v-0.96h-4.435 c-0.991,0-1.325-0.416-1.325-1.011v-6.669h-1.92V33.08z"></path><path fill="#f57f17" d="M30.704,33.121v-4.8c0-1.02,0.5-1.724,1.916-1.92h0.672h3.447h0.525 c1.416,0.196,2.08,0.899,2.08,1.92v4.782c0,0.827-0.215,1.271-0.916,1.559L39.916,36h-2.16l-1.07-0.96h-1.257l-2.136,0.012 c-0.309,0-0.635-0.043-0.993-0.141C31.226,34.618,30.704,34.054,30.704,33.121z M32.624,33.121c0.098,0.467,0.473,0.96,1.14,0.96 h1.864l-1.068-0.96h2.175l0.519,0.482c0,0,0.186-0.152,0.186-0.482c0-0.33-0.016-4.8-0.016-4.8c-0.098-0.434-0.538-0.96-1.188-0.96 h-2.471c-0.749,0-1.14,0.548-1.14,1.058L32.624,33.121L32.624,33.121z"></path><path fill="#00796b" d="M46.199,25.389c-1.031-0.028-1.818,0.068-2.491,0.351c-0.191,0.081-0.496,0.083-0.528,0.323 c0.105,0.11,0.121,0.275,0.205,0.41c0.16,0.26,0.432,0.609,0.674,0.791c0.265,0.2,0.538,0.414,0.821,0.587 c0.504,0.307,1.067,0.483,1.553,0.791c0.286,0.181,0.57,0.411,0.85,0.615c0.138,0.102,0.23,0.259,0.41,0.323 c0-0.01,0-0.019,0-0.029c-0.094-0.12-0.119-0.285-0.205-0.411c-0.127-0.127-0.254-0.254-0.381-0.381 c-0.372-0.494-0.846-0.929-1.348-1.289c-0.401-0.288-1.298-0.677-1.466-1.143c-0.01-0.01-0.019-0.019-0.03-0.03 c0.284-0.032,0.617-0.135,0.879-0.205c0.441-0.118,0.834-0.087,1.289-0.205c0.205-0.059,0.41-0.117,0.615-0.176 c0-0.039,0-0.078,0-0.117c-0.23-0.236-0.395-0.548-0.645-0.762c-0.657-0.559-1.373-1.117-2.11-1.583 c-0.409-0.258-0.915-0.426-1.348-0.645c-0.146-0.074-0.402-0.112-0.498-0.234c-0.228-0.29-0.351-0.659-0.527-0.996 c-0.368-0.708-0.73-1.482-1.055-2.227c-0.223-0.508-0.368-1.01-0.645-1.466c-1.331-2.188-2.764-3.509-4.982-4.807 c-0.472-0.276-1.041-0.385-1.642-0.528c-0.323-0.019-0.645-0.039-0.968-0.059c-0.197-0.083-0.401-0.323-0.587-0.44 c-0.735-0.465-2.621-1.475-3.165-0.147c-0.344,0.838,0.514,1.656,0.821,2.081c0.215,0.298,0.491,0.632,0.645,0.968 c0.101,0.22,0.119,0.441,0.205,0.674c0.213,0.574,0.55,1.228,0.826,1.759c0.139,0.269,0.293,0.551,0.469,0.791 c0.108,0.147,0.293,0.212,0.323,0.44c-0.181,0.253-0.191,0.646-0.293,0.968c-0.458,1.445-0.285,3.24,0.381,4.308 c0.204,0.328,0.686,1.032,1.348,0.762c0.579-0.236,0.45-0.967,0.615-1.612c0.037-0.146,0.014-0.253,0.088-0.351 c0,0.01,0,0.019,0,0.03c0.176,0.351,0.351,0.704,0.528,1.055c0.391,0.629,1.084,1.286,1.67,1.73 c0.304,0.23,0.544,0.628,0.938,0.762c0-0.01,0-0.019,0-0.03c-0.01,0-0.019,0-0.03,0c-0.076-0.119-0.196-0.168-0.293-0.264 c-0.229-0.225-0.485-0.504-0.674-0.762c-0.534-0.725-1.006-1.519-1.436-2.345c-0.205-0.395-0.384-0.829-0.557-1.231 c-0.067-0.155-0.066-0.389-0.205-0.469c-0.19,0.294-0.468,0.532-0.615,0.879c-0.234,0.555-0.265,1.233-0.351,1.934 c-0.052,0.018-0.029,0.006-0.059,0.029c-0.408-0.099-0.552-0.518-0.704-0.879c-0.384-0.912-0.455-2.38-0.117-3.429 c0.087-0.272,0.482-1.127,0.323-1.378c-0.076-0.251-0.328-0.396-0.468-0.587c-0.175-0.236-0.348-0.548-0.469-0.821 c-0.314-0.711-0.612-1.538-0.943-2.257c-0.158-0.344-0.425-0.691-0.645-0.996c-0.243-0.338-0.516-0.587-0.704-0.996 c-0.067-0.145-0.158-0.378-0.059-0.528c0.032-0.101,0.076-0.143,0.176-0.176c0.17-0.132,0.643,0.043,0.821,0.117 c0.47,0.195,0.862,0.381,1.26,0.645c0.191,0.127,0.384,0.372,0.615,0.44c0.088,0,0.176,0,0.264,0 c0.413,0.095,0.875,0.03,1.26,0.147c0.682,0.207,1.292,0.529,1.846,0.879c1.69,1.067,3.071,2.585,4.016,4.397 c0.152,0.292,0.218,0.57,0.351,0.879c0.27,0.624,0.611,1.266,0.879,1.876c0.268,0.609,0.53,1.223,0.909,1.73 c0.2,0.266,0.97,0.409,1.319,0.557c0.245,0.104,0.647,0.211,0.879,0.351c0.444,0.268,0.874,0.587,1.289,0.879 C45.528,24.803,46.167,25.124,46.199,25.389z"></path><path fill="#00796b" d="M33.098,14.223c-0.215-0.004-0.367,0.023-0.528,0.059c0,0.01,0,0.019,0,0.03c0.01,0,0.019,0,0.03,0 c0.103,0.21,0.283,0.347,0.41,0.528c0.098,0.205,0.195,0.41,0.293,0.615c0.01-0.01,0.019-0.019,0.029-0.029 c0.181-0.128,0.265-0.332,0.264-0.645c-0.073-0.077-0.084-0.173-0.147-0.264C33.365,14.394,33.203,14.325,33.098,14.223z"></path>
              </svg>
            </div>

          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="./VON JARED CASTILLO .pdf" className="bg-indigo-900 hover:bg-gray-800 backdrop-blur-lg px-8 py-3 !rounded-button text-white font-medium transition-all cursor-pointer whitespace-nowrap flex items-center justify-center rounded-xl">
              <i className="fas fa-download mr-2"></i>Download CV
            </a>

            <button
              onClick={() => scrollToSection("skills")}
              className="border-2 border-indigo-900 px-8 py-3 rounded-xl text-violet-200 font-medium hover:bg-indigo-900 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center justify-center">
               <i className="fas fa-code mr-2"></i>View Skills
           </button>


          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
      <p className="text-xl text-gray-400">Showcasing my latest works and ideas</p>
    </motion.div>

    {/* Search & Filters */}
    <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-400 !rounded-button px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 text-sm"
        />
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
      </div>

      <div className="flex gap-2">
        {[
          { key: "all", label: "All" },
          { key: "full-stack", label: "Full-Stack" },
          { key: "websites", label: "Front-end" },
        ].map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-6 py-3 !rounded-button font-medium transition-all whitespace-nowrap cursor-pointer rounded-lg ${
              selectedCategory === category.key
                ? "bg-indigo-900 text-white"
                : " text-gray-300 hover:bg-gray-800"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>

    {/* Projects Grid */}
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence initial={false} mode="popLayout">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="col-span-full text-center text-gray-400"
          >
            No projects found.
          </motion.div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900 rounded-xl overflow-hidden"
            >
              {/* Infinite smooth transition */}
              <motion.div
                animate={{
                  y: [0, -5, 0, 5, 0], 
                  boxShadow: [
                    "0px 0px 0px ",
                    "0px 0px 0px ",
                    "0px 0px 0px ",
                    "0px 0px 0px ",
                    "0px 0px 0px ",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  // changed to a cubic-bezier array (TypeScript-friendly Easing)
                  ease: [0.42, 0, 0.58, 1],
                  delay: index * 0.3, 
                }}
                className="h-full"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-indigo-900 py-2 rounded-lg text-white font-medium hover:from-violet-600 hover:to-purple-700 transition-all text-center">
                      <i className="fas fa-eye mr-2"></i>View
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-gray-600 py-2 rounded-lg text-gray-300 font-medium hover:bg-gray-800 transition-all text-center">
                      <i className="fab fa-github mr-2"></i>Github
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  </div>
</section>


      {/* Note Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">

        {/* Icons row */}
        <div className="flex items-center justify-center gap-6">

          {/* REACT */}
          <i className="fab fa-react text-4xl text-blue-400 animate-spin-slow"></i>

          {/* TAILWINDCSS */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
            <path fill="#00acc1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"></path>
          </svg>

          {/* JAVASCRIPT */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
            <path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
          </svg>

          {/* TYPESCRIPT */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
            <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect><polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"></polygon><path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"></path>
          </svg>

      </div>

          {/* Caption text */}
          <p className="text-lg text-gray-300 text-center">
            Built with these technologies.
          </p>
  </div>
</div>


      {/* SKILLS */}
<section id="skills" className="py-20 px-6 bg-black/50 text-white bg-fixed">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Skills</h2>
    <p className="text-xl text-gray-400 text-center mb-12">
      Technologies & tools I work with
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Frontend */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        className="border border-gray-400 p-8 rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-6 text-white">Frontend</h3>
        <div className="space-y-6">
          {[
            { icon: <FaHtml5 className="text-orange-500 text-2xl" />, name: "HTML & CSS" },
            { icon: <FaJs className="text-yellow-400 text-2xl" />, name: "JavaScript" },
            { icon: <SiTypescript className="text-blue-500 text-2xl" />, name: "TypeScript" },
            { icon: <FaReact className="text-cyan-400 text-2xl animate-spin-slow" />, name: "React" },
            { icon: <SiTailwindcss className="text-sky-400 text-2xl" />, name: "Tailwind CSS" },
          ].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                {skill.icon}
              </div>
              <span className="text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Backend */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        className="border border-gray-400 p-8 rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-6 text-white">Backend</h3>
        <div className="space-y-6">
          {[
            { icon: <SiMysql className="text-teal-500 text-2xl" />, name: "MySQL" },
            { icon: <FaPhp className="text-indigo-400 text-2xl" />, name: "PHP" },
            { icon: <FaNodeJs className="text-green-500 text-2xl" />, name: "Node.js" },
            { icon: <FaPython className="text-yellow-400 text-2xl" />, name: "Python" },
          ].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                {skill.icon}
              </div>
              <span className="text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Other Tools */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        className="border border-gray-400 p-8 rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-6 text-white">Other Tools</h3>
        <div className="space-y-6">
          {[
            { icon: <SiAdobephotoshop className="text-blue-400 text-2xl" />, name: "Adobe Photoshop" },
            { icon: <FaFileWord className="text-blue-500 text-2xl" />, name: "Microsoft Word" },
            { icon: <FaFileExcel className="text-green-500 text-2xl" />, name: "Microsoft Excel" },
            { icon: <FaFilePowerpoint className="text-orange-500 text-2xl" />, name: "Microsoft PowerPoint" },
            { icon: <FaLinux className="text-gray-300 text-2xl" />, name: "Linux" },
          ].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                {skill.icon}
              </div>
              <span className="text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</section>


      <section id="about" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
              <p className="text-lg text-justify text-gray-300 mb-6">
                My name is Von Jared M. Castillo from Rosales, Pangasinan. I'm a passionate full-stack developer specializing in creating
                modern web applications with a focus on user experience and
                robust functionality.
              </p>
              <div className="bg-gradient-to-r bg-indigo-800/50 to-gray-400 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-violet-400 mb-4">
                  Education
                </h3>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Bachelor of Science in Computer Engineering
                </h4>
                <p className="text-gray-300 mb-2">
                  Major in System and Network Administration
                </p>
                <p className="text-yellow-500">
                  Pangasinan State University - Urdaneta City Campus
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black border">
                <img
                  src="./images/DP2.png"
                  alt="About"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 5, y: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}>
              My Services
          </motion.h2>

    <motion.p
      className="text-xl text-gray-400 text-center mb-12"
      initial={{ opacity: 80, y: -20 }}
      animate={{ opacity: 80, y: 0 }}
      transition={{
        duration: 2,
        delay: 0.2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      What I can do for you
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: "fas fa-code",
          title: "Web Development",
          description: "Full-stack web applications with modern technologies",
        },
        {
          icon: "fab fa-figma",
          title: "Graphic Designing",
          description: "UI/UX design and products engagement",
        },
        {
          icon: "fas fa-tools",
          title: "Computer and Network Troubleshooting",
          description: "Technical support and system optimization",
        },
        {
          icon: "fas fa-database",
          title: "Data Encoding",
          description: "Data entry and database management services",
        },
      ].map((service, index) => (
        <motion.div
          key={index}
          className="border border-white p-8 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 80, y: 50 }}
          animate={{ opacity: 80, y: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="w-16 h-16 bg-indigo-900/70 rounded-lg flex items-center justify-center mx-auto mb-6">
            <i className={`${service.icon} text-2xl text-white`}></i>
          </div>
          <h3 className="text-xl font-bold mb-4">{service.title}</h3>
          <p className="text-gray-400">{service.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-400 text-center mb-12">Let's work together on your next project</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-violet-400 w-6"></i>
                  <span className="ml-4">von.devjs@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-violet-400 w-6"></i>
                  <span className="ml-4">+63 945-206-2243</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-violet-400 w-6"></i>
                  <span className="ml-4">Rosales, Pangasinan, Philippines, 2441</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold mb-4">Follow Me</h4>

               <div className="flex space-x-4">
                 <a
                   href="https://github.com/von-devjs"
                   className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-500 transition-colors cursor-pointer">
                   <i className="fab fa-github text-white"></i>
                </a>

                <a
                  href="https://www.linkedin.com/in/von-castillo-9a9643371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-500 transition-colors cursor-pointer">
                  <i className="fab fa-linkedin text-white"></i>
                </a>
              </div>

              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="w-83 p-3 border border-gray-700 rounded-lg text-white"
                />

              <input
                type="email"
                placeholder="Your Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-83 p-3 border border-gray-700 rounded-lg text-white"
                />

              <input
                type="text"
                placeholder="Subject"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-83 p-3 border border-gray-700 rounded-lg text-white"
                />

              <textarea
                placeholder="Your Message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                className="w-83 p-3 border border-gray-700 rounded-lg text-white h-32">
              </textarea>

              <button
                type="submit" className="w-40 bg-indigo-900 hover:bg-purple-900 py-3 rounded-lg text-white font-medium transition-all cursor-pointer">
                   Send Message
              </button>

            </form>

          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                {/* Logo */}
                <div className="cursor-pointer flex items-center ">
                  <img
                    src="./images/logo main.png"  
                    alt="Logo"
                    className="h-15 w-auto object-contain"
                />

            </div>
              </div>
              <p className="text-gray-400">
                Creating amazing web experiences with modern technologies.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "Projects", "About", "Services", "Contact"].map(
                  (link) => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="block text-gray-400 hover:text-violet-400 transition-colors cursor-pointer"
                    >
                      {link}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/von-devjs" className="text-gray-400 hover:text-violet-400 transition-colors cursor-pointer">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/von-castillo-9a9643371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-violet-400 transition-colors cursor-pointer">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Von Jared Castillo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>



      </div>
  );
};
export default App;
