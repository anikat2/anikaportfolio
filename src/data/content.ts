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
    link: 'https://github.com/anikat2/squarenetes',
  },
  {
    title: 'LockedIn (Technica 2025)',
    tags: ['Javascript', 'Firebase', 'PropelAuth'],
    description: 'Built a chrome extension to block distracting websites and track user focus, specifically curated to optimize studying for students with ADHD.',
    link: 'https://github.com/anikat2/lockedin',
  },
  {
    title: 'RoyalsLib',
    tags: ['C++', 'C#', 'Pros'],
    description: 'Motion planning library using A* and RAMSETE to generate an optimal route for the VEX Robotics competition, scoring the most points and executing the path efficiently.',
    link: '#',
  },
  {
    title: 'AquaRo(ver)',
    tags: ['C++', 'Python'],
    description: 'Sea surface traversing robot with LIDAR capabilities to retrieve trash from the ocean surface, store it onboard, and return it to a designated location for collection.',
    link: 'https://youtu.be/tayNV7yiFQA?si=Fedqef8u0nNdlDoR',
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
    slug: 'tandoori_paneer',
    date: 'June 5, 2026',
    title: 'Tandoori Paneer',
    excerpt: 'My recipe for a Gyro-inspired tandoori paneer bowl!',
    readTime: '2 min',
    tag: 'Recipe',
    format: 'recipe',
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
    
    slug: 'gradient_boost',
    date: 'June 18, 2026',
    title: 'XGBoost and its Computational Finance Applications',
    excerpt: 'Exploring the applications of XGBoost in computational finance.',
    readTime: '6 min',
    tag: 'Deep Dive',
    format: 'article',
    content: [
      {
        type: 'heading',
        text: 'What is Gradient Boosting?',
      },
      {
        type: 'paragraph',
        text: 'Gradient boosting is a machine learning technique that classifies and regresses data using simple decision trees. Each tree is trained to correct the errors of the previous tree. It is typically regarded as one of the best algorithms for prediction for tabular datasets, making it a perfect fit for computational finance.'
      },
      {
        type: 'heading',
        text: 'What is XGBoost?',
      },
      {
        type: 'paragraph',
        text: 'XGBoost stands for Extreme Gradient Boosting, and is an open source library for implementing gradient boosting algorithms. Trees are built in parallel instead of sequentially to optimize compute time.'
      },
      {
        type: 'paragraph',
        text: 'LightGBM and BitBoost are some of its competitors. LightGBM is extremely fast, however is less tuned than XGBoost. CatBoost is used for messy data, but for computational finance we would prefer accuracy, as we typically use structured data.'
      },
      {
        type: 'heading',
        text: 'Applications of XGBoost in Computational Finance',
      },
      {
        type: 'paragraph',
        text:  'Gradient boosting, and by extension XGBoost, has been used to speed up numerical pricing for complex derivatives. It can also be used to calculate expected returns more accurately.'
      },
      {
        type: 'heading',
        text: 'Sources',
      },
      {
        type: 'paragraph',
        text: '“What Is XGBoost?” NVIDIA Data Science Glossary, 13 May 2026, www.nvidia.com/en-us/glossary/xgboost/.'
      },
      {
        type: 'paragraph',
        text: 'Wong, Kay Jan. “CatBoost vs. LightGBM vs. XGBoost.” Towards Data Science, 2025, towardsdatascience.com/catboost-vs-lightgbm-vs-xgboost-c80f40662924/.'
      },
      {
        type: 'paragraph',
        text: ' Jesse Davis & Laurens Devos & Sofie Reyners & Wim Schoutens, . "Gradient boosting for quantitative finance," Journal of Computational Finance, Journal of Computational Finance.'
      },
    ],
  },
  {
    
    slug: '4wd_path_planning',
    date: 'July 4, 2026',
    title: '4 wheel drive path planning algorithms (RRT, Hybrid A*, RRT*)',
    excerpt: 'Examining various path planning algorithms, specifically used for 4 wheel drivetrains',
    readTime: '6 min',
    tag: 'Deep Dive',
    format: 'article',
    content: [
      {
        type: 'heading',
        text: 'What\'s path planning?',
      },
      {
        type: 'paragraph',
        text: 'Path planning is computationally determining the optimal, collision-free route for a robot to take to travel from point A to point B. Although some path planning algorithms can be used for multiple different robots, like arms and humanoids, some are more effective on certain builds.'
      },
      {
        type: 'heading',
        text: 'What is RRT (Rapidly-exploring Random Tree)?',
      },
      {
        type: 'paragraph',
        text: 'RRT is a sampling-based path planning algorithm, which means that it takes a random sample of the space it\'s in. Then, the algorithm uses control inputs, which are the constants the control algorithm (ex. PID, pure pursuit) determines and then drives the system towards a set of randomly selected points. Typically, we see point-to-point convergence, like when a programmer asks a robot to go from (x1, y1, z1) to (x2, y2, z2), and so the approach of directing towards a random set of points allows for adaptability in non-holonomic conditions.',
      },
      {
        type: 'heading',
        text: 'What\'s RRT*?'
      },
      {
        type: 'paragraph',
        text: 'RRT* is fundamentally RRT, but optimized to find the shortest path denoted by the asterisk, a common symbol for an optimized version of an algorithm. RRT*',
      },
      {
        type: 'paragraph',
        text: 'At every step, RRT* tracks a cost factor, which in robotics cases is primarily the distance travelled. If a new point is found that is closer to the goal/has a cheaper cost that the previously determined optimal point, then that new point becomes the optimal one.'
      },
      {
        type: 'paragraph',
        text: 'The second edition to RRT in RRT* is re-wiring, which is the process of checking if a new point is actually closer to the goal than the previously determined optimal point. If it is, then the new point becomes the optimal one, and the previous optimal point is re-wired to be a child of the new optimal point. This allows for a more efficient path to be found, as the algorithm can backtrack and find a better path if it finds a new point that is closer to the goal.',
      },
      {
        type: 'heading',
        text: 'What is A*?'
      },
      {
        type: 'paragraph',
        text: 'Unlike the previous 2 approaches, A* is a grid-based path planning algorithm, which means that the space it performs in is similar to a grid. A*, like RRT*, has a cost factor, which is the distance travelled, and a heuristic, which is an estimate of the distance from the current point to the goal. A* uses these two factors to determine the optimal path to take, and it does this by expanding the node with the lowest cost + heuristic value. This allows A* to find the optimal path in a more efficient manner than RRT and RRT*, as it can backtrack and find a better path if it finds a new point that is closer to the goal. However, it falls short in non-holonomic conditions, as it does not take into account the constraints of the robot, and so it may find a path that is not feasible for the robot to follow.',
      },
      {
        type: 'heading',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'In conclusion, RRT and RRT* are sampling-based path planning algorithms that are more adaptable to non-holonomic conditions, while A* is a grid-based path planning algorithm that is more efficient in finding the optimal path in holonomic conditions. However, A* falls short in non-holonomic conditions, as it does not take into account the constraints of the robot. Therefore, for 4 wheel drive robots, RRT and RRT* are more suitable for path planning in non-straightforward environments, while A* is more suitable for path planning in straightforward environments. However, it is important to note that the choice of path planning algorithm ultimately depends on the specific requirements and constraints of the robot and the environment it operates in.',
      },
      {
        type: 'heading',
        text: 'Sources'
      },
      {
        type: 'paragraph',
        text: '"Rapidly-Exploring Random Trees: A New Tool for Path Planning", Steven M. LaValle, 1998'
      },
      {
        type: 'paragraph',
        text: 'Chin, Tim. “Robotic Path Planning: RRT and RRT*.” Medium, 26 Feb. 2019, theclassytim.medium.com/robotic-path-planning-rrt-and-rrt-212319121378.'
      }
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
