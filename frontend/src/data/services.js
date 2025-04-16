import { Service } from '../types';

export const services = [
  {
    id: 'logo-design',
    title: 'Logo Design',
    description: 'Create a unique and memorable brand identity that sets you apart from competitors.',
    icon: 'Palette',
    price: 'Starting from ₹4,500',
    features: [
      '3 Initial Concepts',
      'Unlimited Revisions',
      'Vector Files',
      'Brand Guidelines',
      'Copyright Transfer',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'Understanding your brand values, target audience, and competition',
      },
      {
        step: 2,
        title: 'Conceptualization',
        description: 'Creating initial design concepts based on research',
      },
      {
        step: 3,
        title: 'Refinement',
        description: 'Iterating on chosen concept with your feedback',
      },
      {
        step: 4,
        title: 'Delivery',
        description: 'Providing final files in all required formats',
      },
    ],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Craft a cohesive and impactful brand identity that resonates with your audience.',
    icon: 'Brush',
    price: 'Starting from ₹7,500',
    features: [
      'Logo Design',
      'Typography Selection',
      'Color Palette',
      'Business Card Design',
      'Social Media Kit',
    ],
    process: [
      {
        step: 1,
        title: 'Research',
        description: 'Analyzing your brand, audience, and competitors to create a strong foundation',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Designing initial concepts for your brand identity',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Collaborating with you to refine the chosen concept',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering the complete brand identity package',
      },
    ],
    portfolio: [
      {
        title: 'E-commerce Brand Identity',
        image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',
        description: 'A modern and vibrant brand identity for an online retail platform',
      },
      {
        title: 'Corporate Rebranding',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        description: 'Professional and sleek branding for a corporate client',
      },
    ],
  },
  {
    id: 'packaging-design',
    title: 'Packaging Design',
    description: 'Create visually appealing and functional packaging that enhances your product’s appeal.',
    icon: 'Box',
    price: 'Starting from ₹6,000',
    features: [
      'Custom Packaging Design',
      '3D Mockups',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your product, target audience, and market trends',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial packaging design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Organic Skincare Packaging',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Eco-friendly and elegant packaging for a skincare brand',
      },
      {
        title: 'Artisan Coffee Bags',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Modern and minimalistic packaging for a premium coffee brand',
      },
    ],
  },
  {
    id: 'business-card-design',
    title: 'Business Card Design',
    description: 'Create a unique and memorable brand identity that sets you apart from competitors.',
    icon: 'Palette',
    price: 'Starting from ₹4,500',
    features: [
      '3 Initial Concepts',
      'Unlimited Revisions',
      'Vector Files',
      'Brand Guidelines',
      'Copyright Transfer',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'Understanding your brand values, target audience, and competition',
      },
      {
        step: 2,
        title: 'Conceptualization',
        description: 'Creating initial design concepts based on research',
      },
      {
        step: 3,
        title: 'Refinement',
        description: 'Iterating on chosen concept with your feedback',
      },
      {
        step: 4,
        title: 'Delivery',
        description: 'Providing final files in all required formats',
      },
    ],
    portfolio: [
      {
        title: 'Tech Startup Rebrand',
        image: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b',
        description: 'Modern and dynamic logo design for an innovative tech company',
      },
      {
        title: 'Restaurant Chain Identity',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Elegant and appetizing logo design for a premium restaurant chain',
      },
    ],
  },
  {
    id: 'letterheads',
    title: 'Letterheads',
    description: 'Create a unique and memorable brand identity that sets you apart from competitors.',
    icon: 'Palette',
    price: 'Starting from ₹4,500',
    features: [
      '3 Initial Concepts',
      'Unlimited Revisions',
      'Vector Files',
      'Brand Guidelines',
      'Copyright Transfer',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'Understanding your brand values, target audience, and competition',
      },
      {
        step: 2,
        title: 'Conceptualization',
        description: 'Creating initial design concepts based on research',
      },
      {
        step: 3,
        title: 'Refinement',
        description: 'Iterating on chosen concept with your feedback',
      },
      {
        step: 4,
        title: 'Delivery',
        description: 'Providing final files in all required formats',
      },
    ],
    portfolio: [
      {
        title: 'Tech Startup Rebrand',
        image: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b',
        description: 'Modern and dynamic logo design for an innovative tech company',
      },
      {
        title: 'Restaurant Chain Identity',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Elegant and appetizing logo design for a premium restaurant chain',
      },
    ],
  },
  {
    id: 'label-design',
    title: 'Label Design',
    description: 'Create visually appealing and functional labels that enhance your product’s appeal.',
    icon: 'Tag',
    price: 'Starting from ₹3,000',
    features: [
      'Custom Label Design',
      '3D Mockups',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your product, target audience, and market trends',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial label design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Organic Juice Label',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Eco-friendly and vibrant label design for an organic juice brand',
      },
      {
        title: 'Artisan Honey Label',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Elegant and minimalistic label design for a premium honey brand',
      },
    ],
  },
  {
    id: 'flex-design',
    title: 'Flex Design',
    description: 'Create visually appealing and functional flex designs that enhance your brand’s visibility.',
    icon: 'Tag',
    price: 'Starting from ₹3,600',
    features: [
      'Custom Flex Design',
      'High-Resolution Graphics',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your brand, target audience, and design requirements',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial flex design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Event Promotion Flex',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Eye-catching flex design for a corporate event',
      },
      {
        title: 'Retail Store Flex',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Vibrant and attractive flex design for a retail store promotion',
      },
    ],
  },
  {
    id: 'catalog-design',
    title: 'Catalog Design',
    description: 'Create visually appealing and functional catalogs that enhance your product’s appeal.',
    icon: 'Book',
    price: 'Starting from ₹5,400',
    features: [
      'Custom Catalog Design',
      'High-Resolution Graphics',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your product, target audience, and market trends',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial catalog design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Fashion Catalog',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Stylish and modern catalog design for a fashion brand',
      },
      {
        title: 'Furniture Catalog',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Elegant and functional catalog design for a furniture company',
      },
    ],
  },
  {
    id: 'brochure-design',
    title: 'Brochure Design',
    description: 'Create visually appealing and functional brochures that enhance your brand’s appeal.',
    icon: 'Book',
    price: 'Starting from ₹5,400',
    features: [
      'Custom Brochure Design',
      'High-Resolution Graphics',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your brand, target audience, and market trends',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial brochure design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Corporate Brochure',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Professional and sleek brochure design for a corporate client',
      },
      {
        title: 'Product Brochure',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Elegant and functional brochure design for a product launch',
      },
    ],
  },
  {
    id: 'banner-design',
    title: 'Banner Design',
    description: 'Create visually appealing and functional banners that enhance your brand’s visibility.',
    icon: 'Tag',
    price: 'Starting from ₹3,600',
    features: [
      'Custom Banner Design',
      'High-Resolution Graphics',
      'Print-Ready Files',
      'Material Consultation',
      'Brand Consistency',
    ],
    process: [
      {
        step: 1,
        title: 'Research & Ideation',
        description: 'Understanding your brand, target audience, and design requirements',
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial banner design concepts',
      },
      {
        step: 3,
        title: 'Feedback & Refinement',
        description: 'Iterating on the design based on your input',
      },
      {
        step: 4,
        title: 'Finalization',
        description: 'Delivering print-ready files and mockups',
      },
    ],
    portfolio: [
      {
        title: 'Event Promotion Banner',
        image: 'https://images.unsplash.com/photo-1609943248052-3b3c7ea3a21b',
        description: 'Eye-catching banner design for a corporate event',
      },
      {
        title: 'Retail Store Banner',
        image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28',
        description: 'Vibrant and attractive banner design for a retail store promotion',
      },
    ],
  },
];