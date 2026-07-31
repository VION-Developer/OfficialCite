import { useState } from "react";
import Globe from "./Globe";
import ReactiveLines from "./ReactiveLines";
import ASCIIReveal from "./ASCIIReveal";
import GalleryP from "./GalleryP";
import AnimeWorld from "./AnimeWorld"; // 1. IMPORTAMOS TU ARCHIVO ANIMEWORLD.TSX

import miImagenLocal from "./assets/developer.png";
import awicon from "./assets/projects_icons/anime_world.png";
import lticon from "./assets/projects_icons/lottie_v.png";
import jnicon from "./assets/projects_icons/json_v.png";

const MARKER_CONFIG = {
  color: "#00f7ff",
  size: 50,
  markers: [
    { lat: 19.4326, lng: -99.1332 }, 
    { lat: 40.7128, lng: -74.006 },  
    { lat: 40.4168, lng: -3.7038 },   
    { lat: -34.6037, lng: -58.3816 },
    { lat: 35.6762, lng: 139.6503 } 
  ]
};

const DOTS_CONFIG = {
  color: "#ffffff",
  size: 5,
  density: 8,
  allDots: false
};

// Componente de Tarjeta de Característica Centrada
function FeatureCard({ numberTitle, subtitle }: { numberTitle: string; subtitle: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: "1 1 clamp(250px, 100%, 340px)",
        backgroundColor: isHovered ? "rgba(10, 20, 35, 0.85)" : "#0b0b0e",
        border: isHovered ? "1px solid #00f7ff" : "1px solid #1a1a20",
        borderRadius: "16px",
        padding: "24px 20px",
        textAlign: "center",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isHovered ? "0 0 30px rgba(0, 247, 255, 0.25)" : "none",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
        boxSizing: "border-box"
      }}
    >
      <h4 style={{ fontSize: "13px", fontWeight: "bold", letterSpacing: "2px", color: isHovered ? "#00f7ff" : "#ffffff", marginBottom: "10px", textTransform: "uppercase" }}>
        {numberTitle}
      </h4>
      <p style={{ fontSize: "14px", color: "#888896", margin: 0, lineHeight: "1.5" }}>
        {subtitle}
      </p>
    </div>
  );
}

// Componente de Tarjeta de Habilidades (Stack Tecnológico) Centrado
function SkillCard({ numberTitle, title, description, tags }: { numberTitle: string; title: string; description: string; tags: string[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: "1 1 clamp(280px, 100%, 360px)",
        backgroundColor: isHovered ? "rgba(12, 22, 38, 0.8)" : "#0a0a0d",
        border: isHovered ? "1px solid #00f7ff" : "1px solid #1a1a22",
        borderRadius: "18px",
        padding: "28px 24px",
        textAlign: "center",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isHovered ? "0 0 30px rgba(0, 247, 255, 0.2)" : "none",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
        boxSizing: "border-box"
      }}
    >
      <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "#00f7ff", marginBottom: "10px" }}>
        {numberTitle}
      </div>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#888896", lineHeight: "1.6", marginBottom: "20px" }}>
        {description}
      </p>
      
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        {tags.map((tag, i) => (
          <span key={i} style={{ 
            fontSize: "11px", 
            backgroundColor: "rgba(255, 255, 255, 0.05)", 
            color: "#cccccc", 
            padding: "5px 12px", 
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  // 2. ESTADO PARA ABRIR LA VISTA DE ANIMEWORLD
  const [proyectoActivo, setProyectoActivo] = useState<string | null>(null);

  // 3. ASIGNAMOS EL CLIC A AWICON
  const MIS_PROYECTOS_IMAGENES = [
    { 
      src: awicon, 
      onClick: () => setProyectoActivo("AnimeWorld") // <- ABRE ANIMEWORLD.TSX
    },
    { src: lticon },
    { src: jnicon }
  ];

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", color: "#ffffff", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexWrap: "wrap",
        gap: "12px 20px",
        padding: "16px clamp(16px, 4vw, 60px)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        boxSizing: "border-box"
      }}>
        <div style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#ffffff", fontWeight: "300" }}>VION</span> <span style={{ color: "#a3aaaa", fontWeight: "300" }}>Developer</span>
        </div>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="#proyectos" style={{ color: "#888896", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}>Desarrollador</a>
          <a href="#galeria" style={{ color: "#888896", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}>Portafolio</a>
          <a href="#habilidades" style={{ color: "#888896", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}>Habilidades</a>
          <a href="#contacto" style={{ 
            backgroundColor: "#ffffff", 
            color: "#000000", 
            padding: "7px 18px", 
            borderRadius: "30px", 
            fontSize: "12px", 
            fontWeight: "700", 
            textDecoration: "none"
          }}>
            Contacto
          </a>
        </div>
      </nav>

      {/* ================= HERO PRINCIPAL ================= */}
      <section style={{ 
        position: "relative", 
        width: "100%", 
        minHeight: "100vh", 
        overflow: "hidden", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center",
        padding: "100px clamp(16px, 5vw, 40px) 40px",
        boxSizing: "border-box"
      }}>
        
        <ReactiveLines 
          backgroundColor="rgb(0, 0, 0)"
          lineColor="rgba(255, 255, 255, 0.75)"
          lineWidth={0.6}
          minLines={20}
          maxLines={108}
          fade={true}
          fadeIntensity={15}
        />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", pointerEvents: "none" }}>
          <h1 style={{ fontSize: "clamp(36px, 6.5vw, 76px)", fontWeight: "bold", margin: "0 0 16px 0", letterSpacing: "-1.5px", lineHeight: "1.1" }}>
            <span style={{ color: "#ffffff" }}>VION</span> <span style={{ fontWeight: "300", color: "#888896" }}>Developer</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 20px)", color: "#888896", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px", lineHeight: "1.6" }}>
            Desarrollador Web Full Stack y Desarrollador de Apps Móviles, APIs, Librerías y Servicios.
          </p>

          <div style={{ pointerEvents: "auto", display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#proyectos" style={{ 
              backgroundColor: "#ffffff", 
              color: "#000000", 
              padding: "12px 30px", 
              borderRadius: "30px", 
              fontSize: "14px", 
              fontWeight: "700", 
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.15)"
            }}>
              Get Started
            </a>
            <a href="#contacto" style={{ 
              backgroundColor: "transparent", 
              color: "#ffffff", 
              border: "1px solid rgba(255, 255, 255, 0.2)", 
              padding: "12px 30px", 
              borderRadius: "30px", 
              fontSize: "14px", 
              fontWeight: "600", 
              textDecoration: "none",
              backdropFilter: "blur(5px)"
            }}>
              Contactar
            </a>
          </div>
        </div>

      </section>


      {/* ================= 2. SECCIÓN: DESARROLLADOR ================= */}
      <section id="proyectos" style={{ padding: "80px clamp(16px, 5vw, 80px)", maxWidth: "1200px", margin: "0 auto", textAlign: "center", boxSizing: "border-box" }}>
        <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: "bold", lineHeight: "1.15", marginBottom: "40px", letterSpacing: "-1px" , color: "#ffffff"}}>
          Conoce Sobre El<br />
          <span style={{ color: "#555560", fontWeight: "normal" }}>Desarrollador</span>
        </h2>

        <div style={{ 
          width: "100%",
          maxWidth: "900px",
          height: "clamp(260px, 42vh, 380px)", 
          margin: "0 auto 30px",
          borderRadius: "24px", 
          overflow: "hidden", 
          border: "1px solid #1a1a22",
          backgroundColor: "#050508",
          position: "relative",
          cursor: "pointer"
        }}>
          <ASCIIReveal 
            image={miImagenLocal}
            columns={200}
            contrast={180}
            inkColor="#00f7ff"
            colorMode="image"
            reveal={true}
            revealOptions={{ size: 100, softness: 20 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <FeatureCard numberTitle="Intuitivo" subtitle="Sistemas faciles de entender y usar." />
          <FeatureCard numberTitle="Rendimiento" subtitle="Mayor velocidad y eficiencia en cada proyecto." />
          <FeatureCard numberTitle="Seguridad" subtitle="Protección de datos y privacidad garantizada." />
        </div>
      </section>


      {/* ================= GALERÍA 3D ================= */}
      <section id="galeria" style={{ padding: "80px clamp(16px, 5vw, 80px)", maxWidth: "1200px", margin: "0 auto", textAlign: "center", borderTop: "1px solid #111116", boxSizing: "border-box" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#a3aaaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
          Portafolio
        </h3>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
          Apps y Servicios
        </h2>
        <p style={{ color: "#888896", fontSize: "14px", marginBottom: "20px" }}>
          Haz clic en cualquier proyecto para explorarlo.
        </p>

        <div style={{ width: "100%", height: "clamp(320px, 45vh, 460px)", position: "relative" }}>
          <GalleryP 
            images={MIS_PROYECTOS_IMAGENES}
            imageWidth={250}
            imageHeight={250}
            speed={6}
            tilt={-6}
            spacing={2.5}
            background="transparent"
          />
        </div>
      </section>


      {/* ================= HABILIDADES ================= */}
      <section id="habilidades" style={{ padding: "80px clamp(16px, 5vw, 80px)", maxWidth: "1200px", margin: "0 auto", textAlign: "center", borderTop: "1px solid #111116", boxSizing: "border-box" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#a3aaaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
          Especialidades
        </h3>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
          Stack Tecnológico
        </h2>
        <p style={{ color: "#888896", fontSize: "14px", marginBottom: "50px" }}>
          Utilizamos lo mejor en tecnologías para crear soluciones innovadoras.
        </p>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <SkillCard 
            numberTitle="FRONTEND & 3D" 
            title="Desarrollo Web Interactivo" 
            description="Creación de interfaces modernas, reactivas y experiencias 3D inmersivas con tecnologías web avanzadas."
            tags={["React", "Three.js", "TypeScript", "Tailwind CSS", "Next.js", "CSS3", "Bootstrap"]}
          />
          <SkillCard 
            numberTitle="BACKEND & ARQUITECTURA" 
            title="Sistemas & APIs Robustas" 
            description="Diseño e implementación de servidores escalables, bases de datos optimizadas y servicios en la nube."
            tags={["Node.js", "Python", "JavaScript", "Java", "Kotlin", "REST APIs"]}
          />
          <SkillCard 
            numberTitle="RENDIMIENTO & OPTIMIZACIÓN" 
            title="Carga Ultra Rápida" 
            description="Optimización de código para lograr tiempos de respuesta instantáneos y animaciones de 60 FPS fluídas."
            tags={["WebGL", "Vite", "Docker", "CI/CD", "AWS"]}
          />
        </div>
      </section>


      {/* ================= GLOBO 3D Y CONTACTO ================= */}
      <section id="contacto" style={{ padding: "80px clamp(16px, 5vw, 80px) 100px", borderTop: "1px solid #111116", textAlign: "center", backgroundColor: "#020203", boxSizing: "border-box" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#a3aaaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
            Presencia Global
          </h3>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "bold", margin: "0 auto 12px", maxWidth: "700px", color: "#ffffff" }}>
           Globalmente Conectados
          </h2>
          <p style={{ color: "#888896", fontSize: "15px", maxWidth: "500px", margin: "0 auto" }}>
            Disfruta de nuestros servicios donde sea que te encuentres.
          </p>
        </div>

        <div style={{ width: "100%", height: "clamp(300px, 45vh, 550px)", position: "relative", margin: "0 auto 40px" }}>
          <Globe 
            speed={1.2}
            scale={9}
            oceanColor="#020203"
            fillColor="#ffffff"
            outlineColor="#00f7ff"
            showOutline={true}
            showGrid={true}
            graticuleColor="#141420"
            dots={DOTS_CONFIG}
            markerConfig={MARKER_CONFIG}
          />
        </div>

        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            formData.append("access_key", "3dffd04d-45d7-4f3e-9734-45433f4947a5");

            const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
            });

            const data = await response.json();
            if (data.success) {
              alert("¡Mensaje enviado con éxito! Te responderé pronto.");
              form.reset();
            } else {
              alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
            }
          }}
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            textAlign: "left",
            boxSizing: "border-box"
          }}
        >
          <input type="text" name="name" placeholder="Tu Nombre" required style={{ width: "100%", backgroundColor: "#0b0b0e", border: "1px solid #1a1a20", borderRadius: "12px", padding: "14px 18px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          <input type="email" name="email" placeholder="Tu Correo Electrónico" required style={{ width: "100%", backgroundColor: "#0b0b0e", border: "1px solid #1a1a20", borderRadius: "12px", padding: "14px 18px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          <textarea name="message" placeholder="Escribe tu mensaje o detalles de tu proyecto..." rows={4} required style={{ width: "100%", backgroundColor: "#0b0b0e", border: "1px solid #1a1a20", borderRadius: "12px", padding: "14px 18px", color: "#ffffff", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          <button type="submit" style={{ width: "100%", backgroundColor: "#00f7ff", color: "#000000", border: "none", borderRadius: "30px", padding: "14px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 0 25px rgba(0, 247, 255, 0.3)", boxSizing: "border-box" }}>
            Enviar Mensaje
          </button>
        </form>
      </section>


      {/* ================= 4. VISTA / OVERLAY DE ANIMEWORLD.TSX ================= */}
      {proyectoActivo === "AnimeWorld" && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 100,
          padding: "80px 20px 40px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Botón flotante para cerrar y volver */}
          <button
            onClick={() => setProyectoActivo(null)}
            style={{
              position: "fixed",
              top: "20px",
              right: "30px",
              backgroundColor: "#00f7ff",
              color: "#000000",
              border: "none",
              padding: "10px 24px",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              zIndex: 101,
              boxShadow: "0 0 20px rgba(0, 247, 255, 0.4)"
            }}
          >
            ✕ Volver al Portafolio
          </button>

          {/* RENDERIZAMOS TU ARCHIVO ANIMEWORLD.TSX */}
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            <AnimeWorld />
          </div>
        </div>
      )}


      <footer style={{ padding: "30px 20px", borderTop: "1px solid #111116", textAlign: "center", color: "#555560", fontSize: "13px" }}>
        © {new Date().getFullYear()} VION Developer. Todos los derechos reservados.
      </footer>

    </div>
  );
}