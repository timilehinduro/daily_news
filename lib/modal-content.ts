interface ModalContent {
  brief: string;
  image: string;
  figure: string;
  text: string;
}

export const welcomeModalContent: ModalContent = {
  brief: 'Welcome to Daily News - AI-Powered Journalism',
  image: '/ai-daily.png',
  figure: '/AI_Gatekeeping_Journal_Minimal.png',
  text: `The Daily News is an AI-driven online news website built 
  to keep you informed about local, national, and global events and 
  affairs around you. We operate through an AI-centered editorial gatekeeping system 
  in which algorithmic processes play a primary role in determining what users see.  
  Our news stories are selected using an AI system that continuously scans incoming 
  news feeds and structured data sources. We filter content by relevance, timeliness, 
  geographic significance, and audience engagement. Our AI independently selects 
  and organizes news content into topic clusters without requiring direct human 
  intervention at the selection stage. The AI system assists in generating news content, 
  drafting headlines, editing, tagging metadata, optimizing search visibility,  
  and distributing news stories.`,  
};

export default welcomeModalContent;
