'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* Header */}
      <header className={scrolled ? 'scrolled' : ''}>
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
            <li><a href="#services" className="nav-link">Servicios</a></li>
            <li><a href="#contact" className="nav-link">Contacto</a></li>
          </ul>
        </nav>
        <a href="#contact" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Contactar</a>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <Image 
            src="/img/hero-v2.png" 
            alt="Arquitectura Cantiere" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tagline">DISEÑO Y EJECUCIÓN</span>
          <h1 className="hero-title">Espacios que<br />Definen el Futuro.</h1>
          <p className="hero-description">
            Cantiere fusiona la visión estética con la excelencia en la construcción. 
            Creamos entornos que inspiran y perduran en el tiempo.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#projects" className="btn btn-primary">Ver Portfolio</a>
            <a href="#about" className="btn btn-outline" style={{ color: 'white' }}>Nuestra Visión</a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: scrolled ? 0 : 0.7, transition: 'var(--transition)', zIndex: 10 }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2rem', textTransform: 'uppercase', color: 'white' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--accent)' }}></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10rem 0' }}>
        <div style={{ marginBottom: '4rem' }}>
          <span className="hero-tagline" style={{ letterSpacing: '0.2rem' }}>Seleccionados</span>
          <h2 className="serif" style={{ fontSize: '3.5rem', marginTop: '1rem', fontWeight: 400 }}>Visión y Cantiere.</h2>
        </div>
         <ProjectSlider 
          title="Casa ST332" 
          type="Barrio Santo Tomás | Pilar"
          description="Una oportunidad de inversión estratégica diseñada para la vida contemporánea. El proyecto se define por su eficiencia espacial y una estética minimalista de alto impacto. Ubicada en el Barrio Cerrado Santo Tomás, la vivienda de 182m² totales fusiona la precisión técnica con la calidez del hogar moderno en un lote de 600m². Próximamente en construcción."
          stats={{ lote: '600 m²', cubiertos: '140 m²', semicubiertos: '42 m²' }}
          images={[
            { src: "/img/ST332-Frente Nocturno.jpg", alt: "Frente Casa ST332", label: "Fachada Principal - Acceso" },
            { src: "/img/ST332-Contrafrente Nocturno 1.jpg", alt: "Contrafrente 332", label: "Galería y Área Social" },
            { src: "/img/ST332-Contrafrente Nocturno 2.jpg", alt: "Vista Piscina 332", label: "Expansión y Paisajismo" }
          ]}
        />
      </section>

      {/* About Section */}
      <section id="about" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <span className="hero-tagline">El Estudio</span>
            <h2 className="serif" style={{ fontSize: '4rem', margin: '1rem 0', fontWeight: 400, lineHeight: '1.1' }}>Liderazgo y Visión.</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)', marginBottom: '2.5rem', marginTop: '1rem' }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.8', fontWeight: 300 }}>
              Fundado por el **Arq. Santiago Grasso**, graduado de la Universidad Torcuato Di Tella, 
              Cantiere nace de una conexión profunda con el "hacer". Su nombre, que en italiano significa **Obra**, 
              es un homenaje al legado familiar y a la pasión por la construcción real y tangible.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', fontWeight: 300 }}>
              El estudio busca redefinir la arquitectura residencial en Argentina integrando procesos de diseño 
              disruptivo con métodos de ejecución de alta calidad, asegurando que cada proyecto —cada Cantiere— 
              sea una pieza única de ingeniería y arte.
            </p>
            
            {/* Re-including Stats inside About */}
            <div className="stats" style={{ marginTop: '4rem', display: 'flex', gap: '4rem', borderTop: '1px solid var(--border)', paddingTop: '3rem', backgroundColor: 'transparent', padding: '3rem 0' }}>
              <div className="stat-item" style={{ textAlign: 'left' }}>
                <span className="stat-number" style={{ fontSize: '2.5rem' }}>5+</span>
                <span className="stat-label" style={{ fontSize: '0.7rem' }}>Años de Trayectoria</span>
              </div>
              <div className="stat-item" style={{ textAlign: 'left' }}>
                <span className="stat-number" style={{ fontSize: '2.5rem' }}>15+</span>
                <span className="stat-label" style={{ fontSize: '0.7rem' }}>Proyectos Realizados</span>
              </div>
              <div className="stat-item" style={{ textAlign: 'left' }}>
                <span className="stat-number" style={{ fontSize: '1.5rem', marginTop: '0.8rem', display: 'block' }}>UTDT</span>
                <span className="stat-label" style={{ fontSize: '0.7rem' }}>Alumni Torcuato Di Tella</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', height: '70vh', backgroundColor: '#000' }}>
            <Image 
              src="/img/interior.png" 
              alt="Estudio Cantiere" 
              fill 
              style={{ objectFit: 'cover', opacity: 0.5, filter: 'grayscale(100%) brightness(0.8)' }} 
            />
            <div style={{ position: 'absolute', bottom: '2rem', right: '-2rem', padding: '2.5rem', backgroundColor: 'rgba(10,10,10,0.85)', borderLeft: '3px solid var(--accent)', backdropFilter: 'blur(10px)', zIndex: 5 }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.2rem' }}>Director</span>
              <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem', letterSpacing: '0.05rem' }}>Arq. Santiago Grasso</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - More space */}
      <section id="services" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="hero-tagline">Hacia la Perfección</span>
            <h2 className="serif" style={{ fontSize: '3.5rem', fontWeight: 400 }}>Diseño Integral.</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { title: 'Planificación Arquitectónica', desc: 'Conceptualización de espacios que respiran e inspiran. Desde el primer trazo hasta el proyecto ejecutivo final.', icon: '📐' },
              { title: 'Interiorismo y Diseño', desc: 'Detalles que armonizan con la estructura y el alma del hogar. Mobiliario, iluminación y materialidad curada.', icon: '🪑' },
              { title: 'Ejecución y Construcción', desc: 'Garantizando precisión técnica desde el plano hasta la llave en mano. Administración eficiente de obra.', icon: '🏗️' }
            ].map((service, i) => (
              <div key={i} style={{ padding: '3.5rem', border: '1px solid var(--border)', transition: 'var(--transition)', position: 'relative', overflow: 'hidden' }} className="service-card">
                <span style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block' }}>{service.icon}</span>
                <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 400 }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{service.desc}</p>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '2px', backgroundColor: 'var(--accent)', transition: 'var(--transition)' }} className="service-line"></div>
              </div>
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
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '4rem', border: '1px solid var(--border)', borderRadius: '4px', backdropFilter: 'blur(20px)' }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Nombre Completo</label>
                <input type="text" placeholder="Ej: Juan Pérez" className="contact-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Email de Contacto</label>
                <input type="email" placeholder="ejemplo@email.com" className="contact-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1rem' }}>Contanos tu idea</label>
                <textarea rows={4} placeholder="Decinos brevemente qué proyecto tenés en mente..." className="contact-input" style={{ resize: 'none' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>Enviar Mensaje</button>
            </form>
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

// Componente de Slider tipo "Obra"
function ProjectSlider({ title, type, description, images, stats }: any) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((current + 1) % images.length);
      setFade(false);
    }, 400);
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((current - 1 + images.length) % images.length);
      setFade(false);
    }, 400);
  };

  return (
    <div className="project-slider-wrapper" style={{ marginTop: '4rem' }}>
      {/* Área de Imagen */}
      <div className="project-image-container" style={{ position: 'relative', width: '100%', height: '75vh', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#000' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: fade ? 0 : 1, transition: 'opacity 0.4s ease-in-out' }}>
          <Image src={images[current].src} alt={images[current].alt} fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
        </div>
        
        {/* Navegación sutil */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 20 }}>
          <button onClick={handlePrev} className="btn-slider-small">←</button>
          <button onClick={handleNext} className="btn-slider-small">→</button>
        </div>

        <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(10px)', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.75rem', letterSpacing: '0.2rem', color: 'var(--accent)', border: '1px solid var(--border)' }}>
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Área de Información */}
      <div className="project-details" style={{ padding: '3.5rem 0 0 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem' }}>
        <div>
          <span className="project-type" style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.2rem' }}>{type}</span>
          <h3 className="serif" style={{ fontSize: '3.8rem', margin: '1rem 0', fontWeight: 400, letterSpacing: '0.02rem', lineHeight: '1' }}>{title}</h3>
          <p style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '0.1rem', marginTop: '1.5rem', textTransform: 'uppercase' }}>{images[current].label}</p>
          
          {stats && (
            <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', borderLeft: '2px solid var(--accent)', paddingLeft: '2.5rem', textAlign: 'justify', hyphens: 'auto', fontWeight: 300 }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
