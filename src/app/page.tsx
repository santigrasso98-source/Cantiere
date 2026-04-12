'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [
    {
      id: 'ph-recoleta',
      title: "PH Recoleta",
      type: "Interiorismo & Reforma",
      description: "Una intervención integral en un PH de época donde la materialidad es la protagonista. Se destaca el uso de mármoles bookmatched, griferías de bronce y una búsqueda de calidez a través de texturas de piedra y madera.",
      stats: { lote: 'N/A', cubiertos: '120 m²', semicubiertos: '15 m²' },
      thumbnail: "/img/staircase-top.jpg",
      images: [
        { src: "/img/staircase-top.jpg", alt: "Escalera Caracol Cenital", label: "Escalera de Diseño - Vista Cenital" },
        { src: "/img/bathroom-luxury.jpg", alt: "Baño Lujo", label: "Suite Principal - Calacatta & Luz" },
        { src: "/img/stone-bath.jpg", alt: "Baño Piedra", label: "Segundo Baño - Texturas Naturales" },
        { src: "/img/staircase-side.jpg", alt: "Escalera Lateral", label: "Detalle Escultórico de Obra" },
        { src: "/img/marble-detail.jpg", alt: "Detalle Marmol", label: "Mármol Bookmatched - Precisión" }
      ]
    },
    {
      id: 'st332',
      title: "Casa ST332",
      type: "Barrio Santo Tomás | Pilar",
      description: "Una oportunidad de inversión estratégica diseñada para la vida contemporánea. El proyecto se define por su eficiencia espacial y una estética minimalista de alto impacto.",
      stats: { lote: '600 m²', cubiertos: '140 m²', semicubiertos: '42 m²' },
      thumbnail: "/img/ST332-Frente-Dia-Final.png",
      images: [
        { src: "/img/ST332-Frente-Dia-Final.png", alt: "Frente Casa ST332 Día", label: "Fachada Principal - Versión Día" },
        { src: "/img/ST332-Frente Nocturno.png", alt: "Frente Casa ST332", label: "Fachada Principal - Acceso Nocturno" },
        { src: "/img/ST332-Contrafrente Nocturno A.png", alt: "Contrafrente Casa ST332", label: "Fachada Contrafrente - Galería" },
        { src: "/img/ST332-Contrafrente Nocturno B.png", alt: "Contrafrente Pilta 332", label: "Galería y Pileta" }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(aboutScrollProgress, [0, 1], [0, -100]);
  const y2 = useTransform(aboutScrollProgress, [0, 1], [0, 100]);
  const y3 = useTransform(aboutScrollProgress, [0, 1], [0, -50]);

  return (
    <main>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Custom Cursor */}
      <motion.div
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`}
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 20),
          y: mousePosition.y - (isHovered ? 40 : 20)
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <span className="cursor-text">{cursorText}</span>
        {!cursorText && <div className="custom-cursor-dot" />}
      </motion.div>

      {/* Header */}
      <header className={`${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', cursor: 'pointer' }}>
            <div className="logo" style={{ marginBottom: '-5px', letterSpacing: '0.84rem', marginRight: '-0.84rem', fontSize: '1.8rem', fontWeight: 700 }}>CANTIERE</div>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.12rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, borderTop: '1px solid rgba(212, 175, 55, 0.4)', paddingTop: '4px', marginTop: '4px', textAlign: 'center' }}>Arquitectura & Construcción</span>
          </div>
        </a>

        <nav>
          <ul className="nav-links">
            <li><a href="#projects" className="nav-link">Proyectos</a></li>
            <li><a href="#about" className="nav-link">Estudio</a></li>
            <li><a href="#process" className="nav-link">Proceso</a></li>
            <li><a href="#services" className="nav-link">Servicios</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#contact" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Contactar</a>
          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <nav style={{ textAlign: 'center' }}>
          {[
            { label: 'Proyectos', href: '#projects' },
            { label: 'Estudio', href: '#about' },
            { label: 'Proceso', href: '#process' },
            { label: 'Servicios', href: '#services' }
          ].map((item, i) => (
            <div key={item.label} style={{ transitionDelay: `${i * 0.1}s` }} className="mobile-nav-link">
              <a
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            <Image
              src="/img/ST332-Frente-Dia-Final.png"
              alt="Arquitectura Cantiere - Casa ST332"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </motion.div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-tagline"
          >
            DISEÑO Y EJECUCIÓN
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title"
          >
            Espacios que<br />Definen el Futuro.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-description"
          >
            Cantiere fusiona la visión estética con la excelencia en la construcción.
            Creamos entornos que inspiran y perduran en el tiempo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-actions"
            style={{ display: 'flex', gap: '1.5rem' }}
          >
            <a
              href="#projects"
              className="btn btn-primary"
              onMouseEnter={() => { setIsHovered(true); setCursorText("VER"); }}
              onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
            >Ver Portfolio</a>
            <a
              href="#about"
              className="btn btn-outline"
              style={{ color: 'white' }}
              onMouseEnter={() => { setIsHovered(true); setCursorText("SOBRE"); }}
              onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
            >Nuestra Visión</a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: scrolled ? 0 : 0.7, transition: 'var(--transition)', zIndex: 10 }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2rem', textTransform: 'uppercase', color: 'white' }}>Deslizar</span>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--accent)' }}></div>
        </motion.div>
      </section>

      {/* Projects Section - Scalable Grid */}
      <section id="projects" className="container" style={{ padding: '10rem 0' }}>
        <Reveal>
          <div style={{ marginBottom: '5.5rem' }}>
            <span className="hero-tagline" style={{ letterSpacing: '0.2rem' }}>Seleccionados</span>
            <h2 className="serif" style={{ fontSize: '3.5rem', marginTop: '1rem', fontWeight: 400 }}>Visión y Cantiere.</h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '3rem' }}>
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <div
                className="project-card"
                style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => { setIsHovered(true); setCursorText("DETALLE"); }}
                onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
              >
                <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} style={{ height: '100%' }}>
                    <Image src={project.thumbnail} alt={project.title} fill style={{ objectFit: 'cover' }} />
                  </motion.div>
                  <div className="card-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', transition: '0.3s' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15rem' }}>{project.type}</span>
                    <h3 className="serif" style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{project.title}</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0 }} className="card-cta">
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Ver Proyecto</span>
                      <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modal Portfólio */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 9999, overflowY: 'auto', padding: '5rem 0' }}
              onMouseEnter={() => { setIsHovered(true); setCursorText("CERRAR"); }}
              onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
              onClick={() => setSelectedProject(null)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                style={{ position: 'fixed', top: '2rem', right: '3rem', background: 'none', border: 'none', color: 'white', fontSize: '2.5rem', cursor: 'pointer', zIndex: 10001, padding: '1rem' }}
              >
                ×
              </button>

              <div className="container" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <ProjectSlider
                  title={selectedProject.title}
                  type={selectedProject.type}
                  description={selectedProject.description}
                  stats={selectedProject.stats}
                  images={selectedProject.images}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="about" ref={aboutRef} style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', minHeight: '120vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '15rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '8rem', alignItems: 'center' }}>
          <Reveal>
            <div>
              <span className="hero-tagline">El Estudio</span>
              <h2 className="serif" style={{ fontSize: '4.5rem', margin: '1rem 0', fontWeight: 400, lineHeight: '1' }}>Hacer &<br />Construir.</h2>
              <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '3rem', marginTop: '1.5rem' }}></div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', marginBottom: '2.5rem', lineHeight: '1.8', fontWeight: 300 }}>
                Fundado por el **Arq. Santiago Grasso**, graduado de la Universidad Torcuato Di Tella,
                Cantiere nace de una conexión profunda con el "hacer". Su nombre es un homenaje al legado familiar
                y a la pasión por la construcción real y tangible.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
                <div>
                  <h4 style={{ color: 'var(--accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginBottom: '1rem' }}>Obra Directa</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Controlamos cada etapa del proceso. Nuestra visión nace en el tablero y se concreta en el campo, sin intermediarios que diluyan la calidad.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginBottom: '1rem' }}>Precisión Técnica</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Fusionamos el diseño de vanguardia con un rigor constructivo absoluto. Cada detalle está pensado para ser construido con perfección.</p>
                </div>
              </div>

              <div className="stats" style={{ display: 'flex', gap: '5rem', borderTop: '1px solid var(--border)', paddingTop: '4rem', backgroundColor: 'transparent', padding: '4rem 0' }}>
                <div className="stat-item" style={{ textAlign: 'left' }}>
                  <span className="stat-number" style={{ fontSize: '3rem' }}>5+</span>
                  <span className="stat-label" style={{ fontSize: '0.7rem' }}>Años de Trayectoria</span>
                </div>
                <div className="stat-item" style={{ textAlign: 'left' }}>
                  <span className="stat-number" style={{ fontSize: '3rem' }}>15+</span>
                  <span className="stat-label" style={{ fontSize: '0.7rem' }}>Obras de Autor</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(12, 1fr)', gap: '1.5rem', height: '90vh', position: 'relative' }}>
            {/* Imagen 1: Obra (Chica - B&N) */}
            <motion.div style={{ gridColumn: '1 / 6', gridRow: '1 / 7', position: 'relative', overflow: 'hidden', borderRadius: '4px', zIndex: 2, y: y1 }}>
              <Reveal delay={0.2} style={{ height: '100%' }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 1 }} style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Image src="/img/concrete-column.jpeg" alt="Obra en Proceso - Cantiere" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
                </motion.div>
              </Reveal>
            </motion.div>

            {/* Imagen 2: Diseño (Mediana - B&N) */}
            <motion.div style={{ gridColumn: '2 / 7', gridRow: '7 / 13', position: 'relative', overflow: 'hidden', borderRadius: '4px', zIndex: 3, border: '1px solid var(--border)', y: y2 }}>
              <Reveal delay={0.4} y={50} style={{ height: '100%' }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 1 }} style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Image src="/img/staircase-side.jpeg" alt="Escalera Escultórica - Cantiere" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
                </motion.div>
              </Reveal>
            </motion.div>

            {/* Imagen 3: Terminaciones (Grande y Ancha - B&N) */}
            <motion.div style={{ gridColumn: '6 / 13', gridRow: '2 / 12', position: 'relative', overflow: 'hidden', borderRadius: '4px', zIndex: 4, border: '10px solid var(--bg-secondary)', y: y3 }}>
              <Reveal delay={0.6} y={30} style={{ height: '100%' }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 1 }} style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Image src="/img/bathroom-luxury.jpeg" alt="Terminaciones de Lujo - Cantiere" fill style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(1.05)' }} />
                </motion.div>
              </Reveal>
            </motion.div>

            {/* Float Director Tag */}
            <div style={{ position: 'absolute', bottom: '0', right: '-3rem', zIndex: 10 }}>
              <Reveal delay={0.8} x={20}>
                <div style={{ padding: '2.5rem 3rem', backgroundColor: 'rgba(10,10,10,0.95)', borderLeft: '4px solid var(--accent)', backdropFilter: 'blur(20px)', boxShadow: '20px 20px 60px rgba(0,0,0,0.5)' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.3rem', display: 'block', marginBottom: '0.5rem' }}>Director</span>
                  <h4 className="serif" style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.05rem' }}>Arq. Santiago Grasso</h4>
                  <div style={{ marginTop: '1rem', width: '30px', height: '1px', backgroundColor: 'var(--border)' }}></div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - High End Methodology */}
      <section id="process" style={{ backgroundColor: 'var(--bg-dark)', padding: '15rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
              <span className="hero-tagline">Metodología</span>
              <h2 className="serif" style={{ fontSize: '4rem', fontWeight: 400 }}>El Camino Cantiere.</h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {[
              { num: '01', title: 'Conceptualización', desc: 'Traducimos tus deseos en un lenguaje arquitectónico único. Definimos la volumetría y la relación con el entorno.' },
              { num: '02', title: 'Proyecto Ejecutivo', desc: 'Documentación técnica con máximo nivel de detalle. Planimetría, instalaciones y especificación de materiales.' },
              { num: '03', title: 'Dirección & Obra', desc: 'Materializamos el proyecto con mano de obra especializada, garantizando que lo construido sea idéntico a lo diseñado.' }
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div style={{ padding: '3rem', borderLeft: '1px solid var(--border)', position: 'relative' }}>
                  <span style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '1.5rem', fontFamily: 'var(--font-outfit)' }}>{step.num}</span>
                  <h3 className="serif" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: 400 }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - More space */}
      <section id="services" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="hero-tagline">Hacia la Perfección</span>
              <h2 className="serif" style={{ fontSize: '3.5rem', fontWeight: 400 }}>Diseño Integral.</h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { title: 'Planificación Arquitectónica', desc: 'Conceptualización de espacios que respiran e inspiran. Desde el primer trazo hasta el proyecto ejecutivo final.', icon: '📐' },
              { title: 'Interiorismo y Diseño', desc: 'Detalles que armonizan con la estructura y el alma del hogar. Mobiliario, iluminación y materialidad curada.', icon: '🪑' },
              { title: 'Ejecución y Construcción', desc: 'Garantizando precisión técnica desde el plano hasta la llave en mano. Administración eficiente de obra.', icon: '🏗️' }
            ].map((service, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <motion.div
                  whileHover={{ y: -10 }}
                  style={{ padding: '3.5rem', border: '1px solid var(--border)', transition: 'var(--transition)', position: 'relative', overflow: 'hidden' }}
                  className="service-card"
                >
                  <span style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block' }}>{service.icon}</span>
                  <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 400 }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{service.desc}</p>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '2px', backgroundColor: 'var(--accent)', transition: 'var(--transition)' }} className="service-line"></div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Full Screen Lead Generation */}
      <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', alignItems: 'flex-start' }}>
          <div>
            <span className="hero-tagline">Comenzá tu Proyectó</span>
            <h2 className="serif" style={{ fontSize: '4.5rem', margin: '1rem 0', fontWeight: 400, lineHeight: '1' }}>Hablemos.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.7', marginTop: '2rem' }}>
              Estamos listos para transformar tu visión en una obra de arte técnica. Dejanos tus datos y nos pondremos en contacto a la brevedad.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Email</span>
                <p style={{ fontSize: '1.2rem' }}>cantiere.obra@gmail.com</p>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>WhatsApp</span>
                <p style={{ fontSize: '1.2rem' }}>+54 9 11 5833 9630</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '4rem', border: '1px solid var(--border)', borderRadius: '4px', backdropFilter: 'blur(20px)', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '2rem' }}>✓</div>
                  <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¡Mensaje Enviado!</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    Gracias por contactarnos. Tu consulta ha sido recibida y el equipo de Cantiere se pondrá en contacto con vos a la brevedad.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="btn btn-outline"
                    style={{ marginTop: '3rem', color: 'white' }}
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setFormState('submitting');

                    try {
                      const response = await fetch('https://formspree.io/f/mwvwgrea', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                      });

                      if (response.ok) {
                        setFormState('success');
                        setFormData({ name: '', email: '', message: '' });
                      } else {
                        alert('Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.');
                        setFormState('idle');
                      }
                    } catch (error) {
                      alert('Error de conexión. Por favor, verificá tu internet.');
                      setFormState('idle');
                    }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Nombre Completo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="contact-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onInvalid={(e: any) => e.target.setCustomValidity('Por favor, completá este campo.')}
                      onInput={(e: any) => e.target.setCustomValidity('')}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Email de Contacto</label>
                    <input
                      required
                      type="email"
                      placeholder="ejemplo@email.com"
                      className="contact-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onInvalid={(e: any) => e.target.setCustomValidity('Por favor, ingresá un mail válido.')}
                      onInput={(e: any) => e.target.setCustomValidity('')}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Contanos tu idea</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Decinos brevemente qué proyecto tenés en mente..."
                      className="contact-input"
                      style={{ resize: 'none' }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onInvalid={(e: any) => e.target.setCustomValidity('Por favor, dejanos un breve mensaje sobre tu proyecto.')}
                      onInput={(e: any) => e.target.setCustomValidity('')}
                    ></textarea>
                  </div>
                  <button
                    disabled={formState === 'submitting'}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.5rem', fontSize: '0.9rem', cursor: 'pointer', opacity: formState === 'submitting' ? 0.7 : 1 }}
                  >
                    {formState === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '6rem 10%', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', marginBottom: '2.5rem', cursor: 'pointer' }}>
                <div className="logo" style={{ marginBottom: '-5px', letterSpacing: '0.67rem', marginRight: '-0.67rem', fontSize: '1.8rem', fontWeight: 700 }}>CANTIERE</div>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.12rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, borderTop: '1px solid rgba(212, 175, 55, 0.4)', paddingTop: '4px', marginTop: '4px', textAlign: 'center' }}>Arquitectura & Construcción</span>
              </div>
            </a>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.8' }}>
              Proyectos y ejecuciones con estándar internacional. Enfoque disruptivo en diseño residencial y comercial.
            </p>
          </div>
          <div>
            <h4 style={{ textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1rem', fontSize: '0.8rem', color: 'var(--accent)' }}>Contacto</h4>
            <p style={{ marginBottom: '0.5rem' }}><a href="mailto:cantiere.obra@gmail.com" className="footer-link">cantiere.obra@gmail.com</a></p>
            <p>
              <a href="https://wa.me/5491158339630" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>WhatsApp: +54 9 11 5833 9630</a>
            </p>
          </div>
          <div>
            <h4 style={{ textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1rem', fontSize: '0.8rem', color: 'var(--accent)' }}>Sedes</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Buenos Aires, Argentina</p>
            <p style={{ color: 'var(--text-secondary)' }}>Pilar, Buenos Aires</p>
          </div>
          <div>
            <h4 style={{ textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1rem', fontSize: '0.8rem', color: 'var(--accent)' }}>Social</h4>
            <p style={{ marginBottom: '0.5rem' }}><a href="#" className="footer-link">Instagram</a></p>
            <p style={{ marginBottom: '0.5rem' }}><a href="#" className="footer-link">Pinterest</a></p>
            <p style={{ marginBottom: '0.5rem' }}><a href="#" className="footer-link">LinkedIn</a></p>
          </div>
        </div>
        <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.05rem' }}>
          &copy; {new Date().getFullYear()} Cantiere Arquitectura & Construcción. Todos los derechos reservados.
        </div>
      </footer>

      {/* Botón Flotante WhatsApp */}
      <a
        href="https://wa.me/5491158339630"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          backgroundColor: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          padding: '1.2rem',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          textDecoration: 'none',
          transition: 'var(--transition)',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.388-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </main>
  );
}

// Helper para revelar contenido al hacer scroll
function Reveal({ children, delay = 0, x = 0, y = 30, style = {} }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}

// Componente de Slider tipo "Obra" con transición de lujo
function ProjectSlider({ title, type, description, images, stats, mirrored = false }: any) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 1.1,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any
    })
  };

  return (
    <div className="project-slider-wrapper" style={{ marginTop: '4rem' }}>
      {/* Área de Imagen con Revelado de Lujo */}
      <div className="project-image-container" style={{ position: 'relative', width: '100%', height: '75vh', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#000' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <motion.div
                animate={{ scale: [1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                style={{ width: '100%', height: '100%' }}
              >
                <Image
                  src={images[current].src}
                  alt={images[current].alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
              </motion.div>
              {/* Overlay de lujo para profundidad */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)' }}></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navegación sutil */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 20 }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="btn-slider-small"
          >←</motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="btn-slider-small"
          >→</motion.button>
        </div>

        <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(10px)', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.75rem', letterSpacing: '0.2rem', color: 'var(--accent)', border: '1px solid var(--border)', zIndex: 20 }}>
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Área de Información */}
      <div className="project-details" style={{ padding: '3.5rem 0 0 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem' }}>
        <Reveal style={{ order: mirrored ? 2 : 1 }}>
          <div style={{ textAlign: mirrored ? 'right' : 'left' }}>
            <span className="project-type" style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.2rem' }}>{type}</span>
            <h3 className="serif" style={{ fontSize: '3.8rem', margin: '1rem 0', fontWeight: 400, letterSpacing: '0.02rem', lineHeight: '1' }}>{title}</h3>
            <p style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '0.1rem', marginTop: '1.5rem', textTransform: 'uppercase' }}>{images[current].label}</p>

            {stats && (
              <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', justifyContent: mirrored ? 'flex-end' : 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Lote</span>
                  <p style={{ fontSize: '1.2rem', color: 'white', fontWeight: 300, marginTop: '0.3rem' }}>{stats.lote}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Cubierta</span>
                  <p style={{ fontSize: '1.2rem', color: 'white', fontWeight: 300, marginTop: '0.3rem' }}>{stats.cubiertos}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Semic.</span>
                  <p style={{ fontSize: '1.2rem', color: 'white', fontWeight: 300, marginTop: '0.3rem' }}>{stats.semicubiertos}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.2} x={mirrored ? -20 : 20} style={{ order: mirrored ? 1 : 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', borderLeft: mirrored ? 'none' : '2px solid var(--accent)', borderRight: mirrored ? '2px solid var(--accent)' : 'none', paddingLeft: mirrored ? '0' : '2.5rem', paddingRight: mirrored ? '2.5rem' : '0', textAlign: mirrored ? 'right' : 'justify', hyphens: 'auto', fontWeight: 300 }}>
              {description}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
