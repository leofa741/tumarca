// lib/portfolio.ts

export type PortfolioProject = {
  id: number;
  title: string;
  client: string;
  image: string;
  description: string;
  category: 'Web Design' | 'Branding + Web' | 'E-Commerce' | 'Landing Page';
  link: string;
  year: number;
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Sitio para Apiario',
    client: 'Dos Reinas Apicultura',
    image: '/portfolio/apiario.png',
    description: 'Diseño moderno y funcional para un negocio familiar.',
    category: 'Web Design',
    link: 'https://www.dosreinasapicultura.com.ar',
    year: 2023,
  },
  {
    id: 2,
    title: 'Web para Carpintería',
    client: ' Carpintería Rubilar Bariloche',
    image: '/portfolio/carpinteria-r.png',
    description: 'Web con diseño atractivo y fácil navegación.',
    category: 'Web Design',
    link: 'https://www.carpinteriarubilar.com.ar',
    year: 2023
  },
  {
    id: 3,
    title: 'E-commerce para BSASTECH',
    client: 'BSASTECH',
    image: '/portfolio/bsastech.png',
    description: 'Tienda online con diseño responsivo y optimizado para ventas.',
    category: 'Landing Page',
    link: 'https://www.bsastechshop.com.ar',
    year: 2024,
  },

];

export default projects;