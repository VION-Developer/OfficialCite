// 1. IMPORTACIÓN CORREGIDA: Aquí importamos FlipG (la animación original)
import FlipG from "./FlipG";
// 2. IMPORTACIÓN NUEVA: Aquí importamos el carrusel 3D
import CoverflowGallery from "./CoverflowGallery";

// 3. IMPORTACIÓN DEL COMPONENTE NEONBORDER:
// Asegúrate de importar el componente NeonBorder que creamos anteriormente.
import NeonBorder from "./NeonBorder"; 

// Opcional: Puedes importar tus propias imágenes locales
import awicon from "./assets/projects_icons/anime_world.png";

//carrusel
import item1 from "./assets/aw_c_items/item1.png";

export default function AnimeWorld() {
  
  // Lista de imágenes para el FlipG original
  const MIS_IMAGENES_ANIME = [
    { image: awicon }
  ];

  // Adaptación de datos para el nuevo CoverflowGallery (necesita estructura { image: { src: ... } })
  const MIS_SLIDES_CARRUSEL = [
    { image: { src: item1 } },
    { image: { src: awicon } }, // Duplicada para efecto 3D
    { image: { src: awicon } }, // Duplicada para efecto 3D
  ];

  // Estilo base para las tarjetas (para mantener la consistencia)
  const commonCardStyle: React.CSSProperties = {
    padding: "30px",
    borderRadius: "20px",
    backgroundColor: "#0b0b0e",
    maxWidth: "600px",
    margin: "0 auto",
    position: "relative", // Necesario para que el NeonBorder envuelva el contenido relativo a este contenedor
    boxSizing: "border-box", // Importante para que el padding no rompa el cálculo del borde
    border: "1px solid #1a1a20", // Mantenemos un borde sutil de respaldo
  };

  return (
    <div style={{
      color: "#ffffff",
      padding: "40px 20px 60px",
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
      background: "radial-gradient(circle at top, rgba(204,145,73,0.12), rgba(0,0,0,0.0) 38%)",
      borderRadius: "28px",
      width: "100%",
      boxSizing: "border-box"
    }}>
      
      {/* Título del Proyecto */}
      <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "bold", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.06em" }}>
        Anime World
      </h1>
      
      <p style={{ fontSize: "18px", color: "#888896", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>
       Bienvenido a la mejor red social de anime en el mundo
      </p>

      {/* ================= CONTENEDOR DE LA ANIMACIÓN FLIPG (ORIGINAL) ================= */}
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
          rounded={10}
        />
      </div>

      {/* ======================================================================= */}
      {/* =================== NEONBORDER ENVOLVIENDO LOS DETALLES ================== */}
      {/* ======================================================================= */}
      <div style={{
        // Contenedor principal que define el área y el margen
        width: "100%",
        maxWidth: "660px",
        margin: "0 auto 50px", 
        position: "relative",
        overflow: "visible",
        borderRadius: "24px",
        boxShadow: "0 0 30px rgba(94,153,255,0.18)",
      }}>
        
        {/* Aqui integramos el componente NeonBorder */}
        {/* Usamos los mismos valores de redondeo (20) y un color neón personalizado */}
        <NeonBorder 
            rounded={24}
            thickness={4}
            glow={100}
            color="#5e99ff"
            movement="continuous"
            speed={16}
        >
            {/* Contenido de la tarjeta (que envuelve NeonBorder) */}
            <div style={{
              ...commonCardStyle,
              border: "none",
              width: "100%",
              background: "linear-gradient(180deg, rgba(11,11,14,0.98) 0%, rgba(11,11,14,0.96) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
              <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#ffffff" }}>
                Detalles de la Aplicación
              </h3>
              <p style={{ color: "#888896", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                Anime World es una plataforma moderna para explorar series, gestionar listas de favoritos e interactuar con contenido multimedia de alta calidad.
              </p>
            </div>
        </NeonBorder>
      </div>
      {/* ================= FIN DE LA TARJETA CON NEONBORDER ===================== */}

      {/* ======================================================================= */}
      {/* ================= NUEVO: SECCIÓN DEL CARRUSEL 3D ====================== */}
      {/* ======================================================================= */}
      <div style={{
        marginTop: "30px",
        borderTop: "1px solid #1a1a20",
        paddingTop: "40px"
      }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#ffffff" }}>
          Galería en Movimiento
        </h2>
        
        {/* Contenedor para el carrusel (necesita altura y anchura fija) */}
        <div style={{ 
          width: "100%", 
          maxWidth: "800px", 
          height: "450px",   
          margin: "0 auto", 
          position: "relative" 
        }}>
          <CoverflowGallery 
            slides={MIS_SLIDES_CARRUSEL}
            cardWidth={350}     
            cardHeight={350}
            tilt={20}
            autoplay={true}
            showTitle={false}
            radius={15}
          />
        </div>
      </div>
      {/* ================= FIN DEL NUEVO CARRUSEL ============================== */}

    </div>
  );
}