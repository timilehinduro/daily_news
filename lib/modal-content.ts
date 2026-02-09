interface ModalContent {
  brief: string;
  image: string;
  text: string;
}

export const welcomeModalContent: ModalContent = {
  brief: 'Welcome to Daily News - AI-Powered Journalism',
  image: '/ai-daily.png',
  text: `The Daily News is an AI-driven online news website built 
  to keep you informed about local, national, and global events and 
  affairs around you. Our news stories are selected using an artificial 
  intelligence (AI) system that filters, categorizes, and prioritizes existing 
  information, shaping what you see based on relevance, interests, 
  engagement patterns, and editorial distribution criteria for news production.`,
};

export default welcomeModalContent;
