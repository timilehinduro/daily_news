interface ModalContent {
  brief: string;
  image: string;
  text: string;// HTML string
}

export const welcomeModalContent: ModalContent = {
  brief: 'Welcome to Daily News - AI-Powered Journalism',
  image: '/ai-daily.png',
  text: `
    <h2>Our AI-Algorithmic Editorial Framework</h2>

    <p>
      The Daily News is an AI-driven online news website built to keep you informed 
      about local, national, and global events and affairs around you. We operate through an AI-centered editorial gatekeeping system 
      in which algorithmic processes play a primary role in determining what users see.
    </p>

    <h3>1. Algorithmic Filtering & Prioritization</h3>
    <p>
      Our AI system continuously scans incoming news feeds and structured data sources. 
      It filters content by relevance, timeliness, geographic significance, and engagement signals.
    </p>
    <h3>2. Autonomous Selection & Curation</h3>
    <p>
      Our AI independently selects and organizes news content into topic clusters without 
      requiring direct human intervention at the selection stage.
    </p>
    <h3>3. AI-Driven Content Generation & Editing</h3>
    <p>
      Our AI assists in generating news content, drafting headlines, editing,
      tagging metadata, and optimizing search visibility.
    </p>
    <h3>4. Automated Distribution & Production</h3>
    <p>
      Our AI distributes stories through algorithms.
    </p>
  `,
};

export default welcomeModalContent;
