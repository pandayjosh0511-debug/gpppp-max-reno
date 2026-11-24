export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  applications: string[];
};

const U = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services: Service[] = [
  {
    slug: 'composite-decking',
    title: 'Composite Decking',
    shortDescription: 'Engineered composite decking that combines natural beauty with lasting performance.',
    description:
      'Our composite decking range brings together the warmth and character of natural timber with the dimensional stability and low maintenance of modern engineered materials. Designed for residential and commercial outdoor living, each board offers a refined surface that retains its appearance through seasons of use.',
    image: U('1516594762805-9a87a90b9ca6'),
    gallery: [U('1516594762805-9a87a90b9ca6'), U('1528459801416-a9e53bbf4e0d'), U('1444930694458-01babe71870e')],
    applications: ['Residential terraces', 'Pool surrounds', 'Rooftop decks', 'Commercial plazas', 'Garden patios'],
  },
  {
    slug: 'timber-decking',
    title: 'Timber Decking',
    shortDescription: 'Premium timber decking for authentic, warm outdoor surfaces.',
    description:
      'Timber decking remains the benchmark for authentic outdoor warmth. Our curated timber range celebrates natural grain, tone and texture — each board selected for its character and architectural suitability. Ideal for projects where the living quality of real timber is essential.',
    image: U('1466637574441-749b8f19452f'),
    gallery: [U('1466637574441-749b8f19452f'), U('1516594762805-9a87a90b9ca6'), U('1503394324252-6b2e60a47d21')],
    applications: ['Residential decks', 'Garden terraces', 'Feature pathways', 'Lounge areas', 'Entertainment spaces'],
  },
  {
    slug: 'architectural-cladding',
    title: 'Architectural Cladding',
    shortDescription: 'Sculptural cladding systems that transform facades and feature walls.',
    description:
      'Architectural cladding defines the character of a building. Our 2D and 3D cladding systems create surfaces with depth, shadow and warmth — from monolithic facades to intimate feature walls. Each system is engineered for durability and designed for architectural expression.',
    image: U('1545324418-cc1a3a10f4f8'),
    gallery: [U('1545324418-cc1a3a10f4f8'), U('1565178899192-71e7b3e6c8e6'), U('1493946740644-2d83a1dcb18e')],
    applications: ['Building facades', 'Feature walls', 'Entrance statements', 'Interior accent walls', 'Commercial frontages'],
  },
  {
    slug: 'pergolas',
    title: 'Pergolas',
    shortDescription: 'Architectural pergola structures for shaded outdoor living.',
    description:
      'A pergola brings architecture to the garden — defining outdoor rooms, creating shade and introducing vertical rhythm. Our pergola systems pair with our decking and cladding ranges for cohesive outdoor environments designed for relaxation and entertaining.',
    image: U('1565178899192-71e7b3e6c8e6'),
    gallery: [U('1565178899192-71e7b3e6c8e6'), U('1545324418-cc1a3a10f4f8'), U('1493946740644-2d83a1dcb18e')],
    applications: ['Outdoor dining areas', 'Lounge terraces', 'Garden focal points', 'Poolside shade', 'Entertainment zones'],
  },
  {
    slug: 'balustrades',
    title: 'Balustrades',
    shortDescription: 'Contemporary balustrade systems for safety and architectural finish.',
    description:
      'Balustrades complete the architectural deck — providing safety with a refined, contemporary presence. Our systems are designed to complement our decking and cladding ranges, with modular components that adapt to residential and commercial applications.',
    image: U('1493946740644-2d83a1dcb18e'),
    gallery: [U('1493946740644-2d83a1dcb18e'), U('1545324418-cc1a3a10f4f8'), U('1565178899192-71e7b3e6c8e6')],
    applications: ['Elevated decks', 'Stairways', 'Terrace edges', 'Balconies', 'Commercial terraces'],
  },
  {
    slug: 'outdoor-living-solutions',
    title: 'Outdoor Living Solutions',
    shortDescription: 'Complete outdoor environments designed for contemporary living.',
    description:
      'Outdoor living is about more than surfaces — it is about creating environments. Our complete solutions bring together decking, cladding, pergolas and balustrades into cohesive outdoor rooms designed for the way people live, gather and relax outside.',
    image: U('1503394324252-6b2e60a47d21'),
    gallery: [U('1503394324252-6b2e60a47d21'), U('1516594762805-9a87a90b9ca6'), U('1466637574441-749b8f19452f')],
    applications: ['Complete outdoor rooms', 'Entertainment areas', 'Poolside environments', 'Rooftop terraces', 'Hospitality spaces'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
