interface SchemaMarkupProps {
  type: 'home' | 'about' | 'services' | 'contact';
}

export default function SchemaMarkup({ type }: SchemaMarkupProps) {
  // Schema base para Leonardo Arena (Persona)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Leonardo Arena",
    "jobTitle": "Desarrollador de Software Senior & Arquitecto de Sistemas",
    "description": "Desarrollador de software con más de 15 años de experiencia en desarrollo web a medida, sistemas de gestión empresarial y soluciones RFID.",
    "url": "https://tumarca.ar",
    "email": "hola@tumarca.ar",
    "telephone": "+541141461312",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Buenos Aires",
      "addressCountry": "AR"
    },
    "knowsAbout": [
      "Desarrollo Web a Medida",
      "Sistemas de Gestión Empresarial",
      "ERP y CRM personalizados",
      "Plataformas Inmobiliarias",
      "Control de Accesos RFID",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Bases de Datos",
      "APIs REST",
      "Arquitectura de Software"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Desarrollador de Software",
      "occupationLocation": {
        "@type": "Place",
        "name": "Argentina"
      }
    }
  };

  // Schema para TuMarca.AR (Organización)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TuMarca.AR",
    "alternateName": "Tu Marca AR",
    "url": "https://tumarca.ar",
    "logo": "https://tumarca.ar/logo.png",
    "description": "Estudio de desarrollo de software especializado en sistemas web a medida, plataformas de gestión empresarial y soluciones tecnológicas innovadoras para empresas en Argentina.",
    "email": "hola@tumarca.ar",
    "telephone": "+541141461312",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Buenos Aires",
      "addressLocality": "Buenos Aires",
      "addressRegion": "CABA",
      "postalCode": "1000",
      "addressCountry": "AR"
    },
    "founder": {
      "@type": "Person",
      "name": "Leonardo Arena",
      "url": "https://tumarca.ar/about"
    },
    "foundingDate": "2010",
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "sameAs": [
      "https://www.linkedin.com/company/tumarca-ar",
      "https://www.instagram.com/tumarca.ar"
    ]
  };

  // Schema para LocalBusiness (Negocio Local)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TuMarca.AR - Desarrollo de Software a Medida",
    "image": "https://tumarca.ar/og-image.jpg",
    "url": "https://tumarca.ar",
    "telephone": "+541141461312",
    "email": "hola@tumarca.ar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Buenos Aires",
      "addressLocality": "Buenos Aires",
      "addressRegion": "CABA",
      "postalCode": "1000",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.6037,
      "longitude": -58.3816
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "founder": {
      "@type": "Person",
      "name": "Leonardo Arena"
    }
  };

  // Schema para Servicios
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Desarrollo de Software a Medida",
    "name": "Desarrollo de Sistemas Web y Software Empresarial",
    "provider": {
      "@type": "Organization",
      "name": "TuMarca.AR",
      "url": "https://tumarca.ar"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo de Software",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web a Medida",
            "description": "Desarrollo de aplicaciones web personalizadas desde cero, adaptadas a los procesos específicos de cada empresa."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sistemas de Gestión Empresarial (ERP/CRM)",
            "description": "Plataformas integrales para gestión de stock, pedidos, presupuestos, clientes y envíos."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plataformas Inmobiliarias",
            "description": "Sistemas web para inmobiliarias con gestión de propiedades en tiempo real."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Control de Accesos RFID",
            "description": "Software de gestión de accesos con tecnología RFID para hospedajes y empresas."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Personalizado",
            "description": "Tiendas online con gestión integrada de inventario, pagos y envíos."
          }
        }
      ]
    }
  };

  // Schema para WebSite (solo en home)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TuMarca.AR",
    "alternateName": "Tu Marca AR - Desarrollo de Software a Medida",
    "url": "https://tumarca.ar",
    "description": "Estudio de desarrollo de software especializado en sistemas web a medida, plataformas de gestión empresarial y soluciones RFID.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tumarca.ar/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Seleccionar qué schema mostrar según la página
  const getSchema = () => {
    switch (type) {
      case 'home':
        return [organizationSchema, localBusinessSchema, websiteSchema, servicesSchema];
      case 'about':
        return [personSchema, organizationSchema];
      case 'services':
        return [servicesSchema, organizationSchema];
      case 'contact':
        return [localBusinessSchema, organizationSchema];
      default:
        return [organizationSchema];
    }
  };

  const schemas = getSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}