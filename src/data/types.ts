// D-01: Work experience entries
export interface ExperienceEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  accomplishments: string[]; // 2-4 bullet points
  companyLogoUrl?: string;
}

// D-02: Skills organized by category
export interface SkillCategory {
  category: string; // e.g., "Languages", "Frameworks", "Tools/Platforms", "Cloud/DevOps"
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// D-03: Social links as flexible typed array
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // icon identifier (e.g., "github", "linkedin")
}

// D-04: Knowledge file with named sections
export interface KnowledgeSection {
  name: string; // e.g., "About", "Experience Summary", "Skills", "Projects", "Fun Facts"
  content: string; // string block for that topic
}
