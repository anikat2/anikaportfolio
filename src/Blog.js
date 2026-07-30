import { useEffect, useState } from 'react';

const posts = [
  {
    id: 'four-wheel-path-planning',
    date: 'July 4, 2026',
    readTime: '6 min read',
    title: '4 wheel drive path planning algorithms (RRT, Hybrid A*, RRT*)',
    subtitle: 'Examining path-planning algorithms for four-wheel drivetrains.',
    topic: 'Robotics / Motion',
    sections: [
      {
        heading: "What's path planning?",
        paragraphs: [
          'Path planning is computationally determining the optimal, collision-free route for a robot to travel from point A to point B. Although some path-planning algorithms can be used for many kinds of robots—including arms and humanoids—some are more effective for particular builds.',
        ],
      },
      {
        heading: 'What is RRT (Rapidly-exploring Random Tree)?',
        paragraphs: [
          'RRT is a sampling-based path-planning algorithm, meaning it takes random samples of the space it occupies. The algorithm expands a tree toward randomly selected points, quickly exploring large or high-dimensional spaces.',
          'This adaptability is useful in non-holonomic conditions, where a robot cannot move freely in every direction and must obey constraints imposed by its drivetrain and control system.',
        ],
      },
      {
        heading: "What's RRT*?",
        paragraphs: [
          'RRT* is fundamentally RRT, but optimized to converge toward a shorter path—the asterisk commonly denotes an optimized version of an algorithm.',
          'At every step, RRT* tracks a cost factor, which in robotics is often distance traveled. If a newly discovered point offers a lower-cost route than the previously selected connection, the tree can adopt the cheaper route.',
          'The second addition is rewiring: nearby points are checked to determine whether connecting through the new point would lower their cost. When it does, their parent relationships are changed. This allows the tree to improve paths it has already found.',
        ],
      },
      {
        heading: 'What is A*?',
        paragraphs: [
          'Unlike the previous two approaches, A* is a grid-based path-planning algorithm. Like RRT*, it uses a cost factor—distance already traveled—and a heuristic estimating the remaining distance to the goal.',
          'A* expands the node with the lowest combined cost and heuristic value, allowing it to find an optimal path efficiently on a suitable grid. Standard A*, however, does not model a robot’s turning radius or drivetrain constraints, so the resulting path may not be feasible for a non-holonomic robot without additional constraints or smoothing.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'RRT and RRT* are sampling-based approaches that adapt well to complex spaces and motion constraints, while A* efficiently finds optimal paths in discretized environments. For four-wheel robots, the right choice depends on the drivetrain, environment, available compute, and whether the planner must produce a directly drivable path.',
        ],
      },
    ],
    sources: [
      {
        label: 'Steven M. LaValle, “Rapidly-Exploring Random Trees: A New Tool for Path Planning,” 1998.',
        href: 'https://msl.cs.illinois.edu/~lavalle/papers/Lav98c.pdf',
      },
      {
        label: 'Tim Chin, “Robotic Path Planning: RRT and RRT*,” Medium, 2019.',
        href: 'https://theclassytim.medium.com/robotic-path-planning-rrt-and-rrt-212319121378',
      },
    ],
  },
  {
    id: 'xgboost-computational-finance',
    date: 'June 18, 2026',
    readTime: '6 min read',
    title: 'XGBoost and its computational finance applications',
    subtitle: 'Exploring gradient boosting in computational finance.',
    topic: 'Machine learning / Finance',
    sections: [
      {
        heading: 'What is gradient boosting?',
        paragraphs: [
          'Gradient boosting is a machine-learning technique that classifies and regresses data using simple decision trees. Each tree is trained to correct the errors of the previous ensemble. It is typically regarded as one of the strongest approaches for prediction on tabular datasets, making it a natural fit for computational finance.',
        ],
      },
      {
        heading: 'What is XGBoost?',
        paragraphs: [
          'XGBoost stands for Extreme Gradient Boosting and is an open-source library for implementing gradient-boosting algorithms. Its implementation is engineered to optimize compute time through parallelized tree construction and other systems-level improvements.',
          'LightGBM and CatBoost are notable alternatives. LightGBM prioritizes speed and efficiency, while CatBoost offers strong handling of categorical and messy data. The right choice ultimately depends on the structure, scale, and accuracy requirements of a dataset.',
        ],
      },
      {
        heading: 'Applications in computational finance',
        paragraphs: [
          'Gradient boosting, and by extension XGBoost, has been used to accelerate numerical pricing for complex derivatives. It can also model expected returns and other outcomes from structured financial data, where nonlinear relationships and interactions between features matter.',
        ],
      },
    ],
    sources: [
      {
        label: 'NVIDIA, “What Is XGBoost?” NVIDIA Data Science Glossary, 2026.',
        href: 'https://www.nvidia.com/en-us/glossary/xgboost/',
      },
      {
        label: 'Kay Jan Wong, “CatBoost vs. LightGBM vs. XGBoost,” Towards Data Science, 2025.',
        href: 'https://towardsdatascience.com/catboost-vs-lightgbm-vs-xgboost-c80f40662924/',
      },
      {
        label: 'Jesse Davis, Laurens Devos, Sofie Reyners, and Wim Schoutens, “Gradient Boosting for Quantitative Finance.”',
      },
    ],
  },
  {
    id: 'machine-vision-fundamentals',
    date: 'June 4, 2026',
    readTime: '6 min read',
    title: 'Machine vision fundamentals',
    subtitle: 'Computer-vision algorithms in industrial automation.',
    topic: 'Machine vision',
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Aggregating material from several sources, I compared the use cases and behavior of computer-vision techniques in industrial automation, including histogram operations, convolution, edge detection, and Fourier-transform methods.',
        ],
      },
      {
        heading: 'What is machine vision?',
        paragraphs: [
          'Machine vision is an application of computer vision focused on automating the inspection of manufactured parts during production. The global machine-vision market is valued at roughly $20 billion and is projected to exceed $41 billion by 2030.',
        ],
      },
      {
        heading: 'Hardware components',
        paragraphs: [
          'Lighting is a central consideration when designing a machine-vision system because reliable analysis begins with high-quality, consistent images. Point, line, or area lighting may be used to reveal the necessary detail. Polarizing filters can reduce glare, and moving subjects may require a rapid shutter to avoid blur.',
          'There has also been a shift toward compact solid-state cameras with no moving parts. These systems use arrays of photodetectors to capture images and can offer greater durability in industrial settings.',
        ],
      },
      {
        heading: 'Software components and fundamentals',
        paragraphs: [
          'A color image at a fixed time can be represented numerically as a multidimensional array whose values vary over space and spectrum. Once represented this way, images can be transformed and analyzed mathematically.',
          'The Fourier transform moves an image from the spatial domain into the frequency domain, exposing the frequencies present in the image. This can support tasks such as compression, filtering, and noise reduction.',
          'Convolution applies a small matrix, or kernel, across an image. Depending on the kernel, it can sharpen an out-of-focus image, soften noise, or emphasize edges.',
          'Histogram processing describes the frequency of intensity levels in an image. It can enhance contrast by redistributing common intensity values or help filter uncommon values associated with noise.',
          'Edge detection identifies sharp changes in image intensity. The Canny detector uses a multi-stage process to isolate edges while reducing noise. Template matching and sequential scanning offer other ways to isolate features such as circles or lines.',
          'Industrial systems must also measure depth. Stereo vision derives depth from two cameras observing a scene from slightly different positions, while structured-light systems project a known pattern and analyze its deformation across an object.',
        ],
      },
    ],
    sources: [
      {
        label: 'Ernest Hall, “Machine Vision Fundamentals,” Handbook of Industrial Automation, CRC Press, 2000.',
      },
      {
        label: 'Eric W. Weisstein, “Fourier Transform,” MathWorld.',
        href: 'https://mathworld.wolfram.com/FourierTransform.html',
      },
      {
        label: 'Eric W. Weisstein, “Convolution,” MathWorld.',
        href: 'https://mathworld.wolfram.com/Convolution.html',
      },
    ],
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!selectedPost) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedPost]);

  return (
    <>
      <section className="blog-section" id="blog" aria-labelledby="blog-title">
        <div className="section-index">
        </div>
        <div className="closing-copy">
          <h2 id="blog-title">
            Blog
          </h2>
          <p className="closing-lede">
            Notes on robotics, intelligent systems, and technology.
          </p>
          <div className="blog-seal" aria-hidden="true">
            <span lang="ja">思考</span>
          </div>
        </div>
        <div className="blog-list">
          {posts.map((post, index) => (
            <button
              className="blog-item"
              type="button"
              key={post.id}
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <time>{post.date}</time>
              </div>
              <h3>{post.title}</h3>
              <p>{post.subtitle}</p>
              <span className="blog-topic">{post.topic}</span>
              <span className="blog-open" aria-hidden="true">Read ↗</span>
            </button>
          ))}
        </div>
      </section>

      {selectedPost && (
        <div className="blog-reader" role="dialog" aria-modal="true" aria-labelledby="reader-title">
          <article className="reader-article">
            <button className="reader-back" type="button" onClick={() => setSelectedPost(null)}>
              ← Back to blog
            </button>
            <header className="reader-header">
              <p className="reader-type">Deep dive</p>
              <div className="reader-meta">
                <time>{selectedPost.date}</time>
                <span>{selectedPost.readTime}</span>
              </div>
              <h1 id="reader-title">{selectedPost.title}</h1>
              <p>{selectedPost.subtitle}</p>
            </header>

            <div className="reader-body">
              {selectedPost.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <section className="reader-sources">
                <h2>Sources</h2>
                <ol>
                  {selectedPost.sources.map((source) => (
                    <li key={source.label}>
                      {source.href ? (
                        <a href={source.href} target="_blank" rel="noreferrer">
                          {source.label}
                        </a>
                      ) : source.label}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
