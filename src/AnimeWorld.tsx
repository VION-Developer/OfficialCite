import FlipG from "./FlipG";

// Opcional: Puedes importar tus propias imágenes locales
import awicon from "./assets/projects_icons/anime_world.png";

export default function AnimeWorld() {
  
  // Lista de imágenes que se voltearán al hacer clic (izquierda o derecha)
  const MIS_IMAGENES_ANIME = [
    { image: awicon }
  ];

  return (
    <div style={{ color: "#ffffff", padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      
      {/* Título del Proyecto */}
      <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "bold", color: "#ffffff", marginBottom: "16px" }}>
        Anime World
      </h1>
      
      <p style={{ fontSize: "18px", color: "#888896", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>
       Bienvenido a la mejor red social de anime en el mundo
      </p>

      {/* ================= CONTENEDOR DE LA ANIMACIÓN FLIPG ================= */}
      <div style={{ 
        width: "100%", 
        maxWidth: "500px", 
        height: "380px", 
        margin: "0 auto 50px", 
        position: "relative" 
      }}>
        <FlipG 
          images={MIS_IMAGENES_ANIME}
          fit="cover"
          rounded={20}
        />
      </div>

      {/* Tarjeta Informativa del Proyecto */}
      <div style={{
        padding: "30px",
        border: "1px solid #1a1a20",
        borderRadius: "20px",
        backgroundColor: "#0b0b0e",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#ffffff" }}>
          Detalles de la Aplicación
        </h3>
        <p style={{ color: "#888896", fontSize: "14px", lineHeight: "1.6" }}>
          Anime World es una plataforma moderna para explorar series, gestionar listas de favoritos e interactuar con contenido multimedia de alta calidad.
        </p>
      </div>

    </div>
  );
}