export const site = {
  name: 'Anika Thakur',
  role: 'Aspiring Roboticist & Baker',
  tagline: 'I am a developer with 6+ years of experience in software engineering, robotics, and advanced mathematics, focused on developing accessible and innovative solutions.',
  email: 'anikathakur212@gmail.com',
  location: 'NYC',
  social: {
    github: 'https://github.com/anikat2',
    linkedin: 'https://www.linkedin.com/in/anika-thakur/',
  },
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  headline: 'Exploring the intersection of code and creativity.',
  paragraphs: [
    'I am a developer with 6+ years of experience in software engineering, robotics, and advanced mathematics, focused on developing accessible and innovative solutions.',
    'When I am not coding, I\'m baking Indian fusion desserts or cooking from a variety of cuisines!',
  ],
  stats: [
    { value: '50+', label: 'Projects' },
    { value: '6+', label: 'Years experience' },
  ],
}

export const skills = [
  { name: 'Java', level: 100 },
  { name: 'Python', level: 100 },
  { name: 'C/C++/C#/Objective C', level: 100 },
  { name: 'Rust', level: 100 },
  { name: 'ROS', level: 100 },
  { name: 'Linux/Unix Systems', level: 100 },
]

export const experience = [
  {
    period: '2026',
    title: 'Early ID Technologist ',
    company: 'Humana',
    description: 
      'Collaborated with students from universities across the US to design innovative technology solutions to real healthcare industry challenges.'
  },
  {
    period: '2026',
    title: 'NPWEE Researcher',
    company: 'NASA L\'Space',
    description:
      'Designed an AI-assisted autonomous air traffic controller system to help address real NASA pain points.',
  },
  {
    period: '2025',
    title: 'Software Engineering Intern',
    company: 'Bloomberg LP',
    description:
      'Engineered automated triage workflows by tracking similar themes in tickets, clustering, and archiving related chats.',
  },
  {
    period: '2025 - 2026',
    title: 'Quantitative Developer',
    company: 'Smith Investment Fund',
    description:
      'Resarched a solution to combat insider trading behavior by using the Fama-French three-factor model to identify economic signals.',
  },
  {
    period: '2025 - 2026',
    title: 'Technology Developer',
    company: 'Bitcamp',
    description:
      'Built scalable backend infrastructure for the largest student-run hackathon in the northeast region, supporting 100s of projects.',
  },
  {
    period: '2021-2025',
    title: 'President, Lead Programmer',
    company: 'VEX Robotics',
    description:
      'Led 100+ students and managed competitions with 50+ teams; implemented a RAMSETE-based motion control algorithm in C++.',
  }
]

export const projects = [
  {
    title: 'Instinct',
    tags: ['React Native', 'Python'],
    description: 'Automated date pairings and planning using CLIP embeddings to allow for optimal date matches.',
    link: 'https://instinct-steel.vercel.app/',
  },
  {
    title: 'Squarenetes',
    tags: ['Python', 'Docker', 'Kubernetes'],
    description: 'Split large enterprise-scale prompts into smaller nodes to process large LLM requests faster, then joined the results together with a custom orchestration layer.',
    link: '#',
  },
  {
    title: 'LockedIn (Technica 2025)',
    tags: ['Javascript', 'Firebase', 'PropelAuth'],
    description: 'Built a chrome extension to block distracting websites and track user focus, specifically curated to optimize studying for students with ADHD.',
    link: '#',
  },
  {
    title: 'RoyalsLib',
    tags: ['C++', 'C#', 'Pros'],
    description: 'Motion planning library using A* and RAMSETE to generate an optimal route for the VEX Robotics competition, scoring the most points and executing the path efficiently.',
    link: '#',
  }
]

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string; variant?: 'inline' | 'cover' }
  | { type: 'recipe-info'; prepTime?: string; cookTime?: string; servings?: string }
  | { type: 'ingredients'; groups: { title?: string; items: string[] }[] }
  | { type: 'steps'; steps: string[] }

export interface BlogPost {
  slug: string
  date: string
  title: string
  excerpt: string
  readTime: string
  tag: string
  format?: 'article' | 'recipe'
  coverImage?: { src: string; alt: string; caption?: string }
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'machine_vision',
    date: 'June 4, 2026',
    title: 'Machine Vision Fundamentals',
    excerpt: 'Exploring the applications of computer vision algorithms in industrial automation.',
    readTime: '6 min',
    tag: 'Deep Dive',
    format: 'article',
    content: [
      {
        type: 'heading',
        text: 'Overview',
      },
      {
        type: 'paragraph',
        text: 'Aggregated from various sources, I compared the use cases and performance of different computer vision algorithms in industrial automation settings, including but not limited to histogram operations, convolution, edge detection, and Fourier transform methods.',
      },
      {
        type: 'heading',
        text: 'What is Machine Vision?',
      },
      {
        type: 'paragraph',
        text: 'Machine vision is an application of computer vision that focuses on optimizing inspection of manufacured parts during production. The global machine vision marke is valued at around $20 billion, projected to reach over $41 billion by 2030.',
      },
      {
        type: 'heading',
        text: 'Hardware Components',
      },
      {
        type: 'paragraph',
        text: 'An important consideration when designing a machine vision system is the lighting, as an important aspect of the system is the ability to capture high-quality, accurate images. Typically, point, line, or area lighting sources are used to ensure high detail (refer to the Photography Principles section for further detail). A second important companent is polarizing filters to reduce glare and further increase the quality of captured images. If a moving object is involved in this, a rapid shutter should be used to prevent blur and match the frame rate of the object.',
      },
      {
        type: 'paragraph',
        text: 'Historically, robot-,ounted cameras have been used, however there has been a recent shift towards solid state technology, which is more compact and has no moving parts, making it more durable and less expensive. Solid state cameras use an array of photodetectors to capture images, while robot-mounted cameras typically use a single lens and sensor.',
      },
      {
        type: 'heading',
        text: 'Software Components and Fundamentals',
      },
      {
        type: 'paragraph',
        text: 'Three dimensional color images at a fixed time can be represented as a 3d Vector in which each component is f(space, time, spectrum). Essentially, this allows the image to become a spatial distribution of the density of an object in x amount of dimensions, and can be transformed between different amoutns.',
      },
      {
        type: 'paragraph',
        text: 'A common transofmation is the Fourier transform, which transforms an image from the spatial domain to the frequency domain, yielding a spectrum of all the possible frequencies present in the image. Imagine this as a way to break down an image into its basic building blocks, which can be useful for tasks like image compression and noise reduction.',
      },
      { 
        type: 'paragraph',
        text: 'Convolution is another fundamental operation in machine vision, where if a program is given two images, it repeats the whole of the first at every point in the second. Essentially, it is a matrix of size image 2 with each element being the first image. You can use this to take an out of focus image and convolve it with a kernel to sharpen it, or to detect edges by convolving it with an edge detection kernel.',
      },
      { 
        type: 'paragraph',
        text: 'Histogram processing portrays the frequency of a particular gray-level in each pixel of an image. This can be used to enhance the contrast of an image by spreading out the most frequent gray levels, or filter out noise by discarding infrequent gray levels.',
      },
      { 
        type: 'paragraph',
        text: 'Edge detection, as the name implies, is the process of identifying the sharp edges of an image. This can be done using various algorithms, such as the Canny edge detector, which uses a multi-stage process to detect edges while minimizing noise. Another is the parallel processing template-matching method, where a window is slid across the image to isolate specific features, such as circles or lines. Another process is sequential scanning, which uses a heuristic to also isolate a feature.',
      },
      { 
        type: 'paragraph',
        text: 'As of now, we have referred to images as matrices or numerical representations of 2D images, however an important consideration, particularly for industrial applications, is gauging 3D depth. This can be done using stereo vision, which uses two cameras to capture images from slightly different angles, allowing for depth perception. Another method is structured light, which projects a known pattern onto the object and analyzes the deformation of the pattern to determine depth.',
      },
      {
        type: 'heading',
        text: 'Sources',
      },
      {
        type: 'paragraph',
        text: 'Hall, Ernest. “Machine Vision Fundamentals.” Handbook Of Industrial Automation, CRC Press, 2000.',
      },
      {
        type: 'paragraph',
        text: 'Weisstein, Eric W. "Fourier Transform." From MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/FourierTransform.html',
      },
      {
        type: 'paragraph',
        text: 'Weisstein, Eric W. "Convolution." From MathWorld--A Wolfram Resource. https://mathworld.wolfram.com/Convolution.html',
      },
    ],
  },
  {
    slug: 'tandoori_paneer',
    date: 'June 5, 2026',
    title: 'Tandoori Paneer',
    excerpt: 'My recipe for a Gyro-inspired tandoori paneer bowl!',
    readTime: '2 min',
    tag: 'Recipe',
    format: 'recipe',
    coverImage: {
      src: '/blog/tandoori-paneer.jpg',
      alt: 'Tandoori paneer bowl with spiced rice and garlic mayo',
      caption: 'Tandoori paneer bowl with spiced rice and garlic mayo',
    },
    content: [
      {
        type: 'recipe-info',
        prepTime: '40 min',
        cookTime: '10 min',
        servings: '1-2',
      },
      {
        type: 'ingredients',
        groups: [
          {
            title: 'Paneer',
            items: [
              '300g paneer (about 1 block), cut into small cubes',
              '1/2 cup plain yogurt',
              '6 tablespoons tandoori masala',
              '1–2 teaspoons kashmiri chili powder',
            ],
          },
          {
            title: 'Rice',
            items: [
              '1 cup pre-cooked basmati rice',
              '1 tablespoon ghee',
              '1/2 teaspoon cumin seeds',
              '1/4 teaspoon turmeric',
              '3 tablespoons dried onion',
              'Salt to taste',
            ],
          },
          {
            title: 'Sauce',
            items: [
              '1 cup mayonnaise',
              '1 tablespoon garlic',
              'A splash of lemon juice',
              '1/2 teaspoon salt',
            ],
          },
        ],
      },
      {
        type: 'steps',
        steps: [
          'Create the paneer marinade by combining the yogurt, tandoori masala, and chili powder in a bowl. Add the paneer cubes and mix until fully coated. Marinate for at least 20 minutes, but no longer than 40 minutes to prevent the paneer from becoming too soft.',
          'While the paneer marinates, prepare the rice. Heat ghee over medium heat, add cumin seeds and onion, then turmeric and salt. Stir in the pre-cooked rice and cook until heated through and well coated.',
          'Cook the paneer in a tawa or skillet over medium-high heat until charred on all sides, about 5–7 minutes. You can also broil it in the oven for a similar effect.',
          'While the paneer cooks, prepare the sauce by mixing mayonnaise, garlic, lemon juice, and salt in a bowl.',
          'Assemble the bowl with spiced rice as the base, tandoori paneer on top, and a drizzle of garlic mayo. Garnish with fresh cilantro or sliced onions if desired.',
        ],
      },
    ],
  },

]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
