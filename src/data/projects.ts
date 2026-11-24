export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
};

const U = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: 'contemporary-poolside-deck',
    title: 'Contemporary Poolside Deck',
    category: 'Residential',
    shortDescription: 'A serene poolside environment in warm composite decking.',
    description:
      'A concept for a contemporary residence where the deck, pool and architecture form a single continuous expression. Warm composite decking wraps the pool surround, creating a barefoot-friendly surface that complements the clean lines of the home.',
    image: U('1545324418-cc1a3a10f4f8'),
    gallery: [U('1545324418-cc1a3a10f4f8'), U('1516594762805-9a87a90b9ca6'), U('1503394324252-6b2e60a47d21'), U('1565178899192-71e7b3e6c8e6')],
  },
  {
    slug: 'modern-residential-terrace',
    title: 'Modern Residential Terrace',
    category: 'Residential',
    shortDescription: 'An elevated terrace overlooking a landscaped garden.',
    description:
      'A concept for an elevated first-floor terrace that extends the living space outdoors. The charcoal decking surface anchors a lounge and dining arrangement, with a matching balustrade system framing the garden views.',
    image: U('1516594762805-9a87a90b9ca6'),
    gallery: [U('1516594762805-9a87a90b9ca6'), U('1466637574441-749b8f19452f'), U('1444930694458-01babe71870e'), U('1503394324252-6b2e60a47d21')],
  },
  {
    slug: 'architectural-cladding-concept',
    title: 'Architectural Cladding Concept',
    category: 'Cladding',
    shortDescription: 'A sculpted facade study in 3D cladding.',
    description:
      'A facade concept exploring the sculptural potential of 3D cladding. Shadow and light move across the surface through the day, giving the building an evolving, living quality.',
    image: U('1565178899192-71e7b3e6c8e6'),
    gallery: [U('1565178899192-71e7b3e6c8e6'), U('1545324418-cc1a3a10f4f8'), U('1493946740644-2d83a1dcb18e'), U('1516594762805-9a87a90b9ca6')],
  },
  {
    slug: 'outdoor-entertainment-space',
    title: 'Outdoor Entertainment Space',
    category: 'Outdoor Structures',
    shortDescription: 'A complete outdoor room for dining and gathering.',
    description:
      'A concept for an outdoor entertainment space that brings together a pergola, composite decking and integrated lighting. The environment is designed for evening gatherings, with warm materials that hold light beautifully.',
    image: U('1503394324252-6b2e60a47d21'),
    gallery: [U('1503394324252-6b2e60a47d21'), U('1466637574441-749b8f19452f'), U('1516594762805-9a87a90b9ca6'), U('1528459801416-a9e53bbf4e0d')],
  },
  {
    slug: 'rooftop-garden-terrace',
    title: 'Rooftop Garden Terrace',
    category: 'Commercial',
    shortDescription: 'A rooftop retreat with composite surfaces and integrated planting.',
    description:
      'A rooftop concept for an urban environment, combining composite decking, planters and a pergola structure. The design creates a private elevated garden with views across the city.',
    image: U('1444930694458-01babe71870e'),
    gallery: [U('1444930694458-01babe71870e'), U('1516594762805-9a87a90b9ca6'), U('1528459801416-a9e53bbf4e0d'), U('1466637574441-749b8f19452f')],
  },
  {
    slug: 'hospitality-pool-deck',
    title: 'Hospitality Pool Deck',
    category: 'Commercial',
    shortDescription: 'A resort-style pool deck in warm timber tones.',
    description:
      'A commercial concept for a hospitality pool deck. Warm timber-tone composite surfaces extend from the interior through to the pool surround, creating a seamless indoor-outdoor experience for guests.',
    image: U('1528459801416-a9e53bbf4e0d'),
    gallery: [U('1528459801416-a9e53bbf4e0d'), U('1516594762805-9a87a90b9ca6'), U('1444930694458-01babe71870e'), U('1503394324252-6b2e60a47d21')],
  },
  {
    slug: 'garden-pergola-lounge',
    title: 'Garden Pergola Lounge',
    category: 'Outdoor Structures',
    shortDescription: 'A shaded garden lounge beneath an architectural pergola.',
    description:
      'A concept for a garden pergola that creates an intimate outdoor lounge. The structure introduces vertical architecture to the landscape while providing shade and a framework for climbing planting.',
    image: U('1466637574441-749b8f19452f'),
    gallery: [U('1466637574441-749b8f19452f'), U('1503394324252-6b2e60a47d21'), U('1565178899192-71e7b3e6c8e6'), U('1516594762805-9a87a90b9ca6')],
  },
  {
    slug: 'residential-facade-cladding',
    title: 'Residential Facade Cladding',
    category: 'Cladding',
    shortDescription: 'A warm timber-clad residential facade.',
    description:
      'A residential facade concept using 2D cladding in a warm teak tone. The cladding wraps the upper level, creating a distinctive architectural identity that sits comfortably in a planted setting.',
    image: U('1493946740644-2d83a1dcb18e'),
    gallery: [U('1493946740644-2d83a1dcb18e'), U('1545324418-cc1a3a10f4f8'), U('1565178899192-71e7b3e6c8e6'), U('1516594762805-9a87a90b9ca6')],
  },
];

export const projectCategories = ['All', 'Residential', 'Commercial', 'Decking', 'Cladding', 'Outdoor Structures'];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const project = getProject(slug);
  if (!project) return [];
  return projects.filter((p) => p.slug !== slug && p.category === project.category).slice(0, limit);
}
