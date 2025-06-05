export type ProjectFrontmatter = {
  /**
   * The title of the project
   */
  title: string;

  /**
   * The description of the project
   */
  description: string;

  /**
   * The tags of the project
   * (eg. ["JavaScript", "React", "Node.js"])
   */
  tags?: string[];

  /**
   * The GitHub URL of the project
   */
  githubUrl?: string;

  /**
   * The live URL of the project
   */
  liveUrl?: string;

  /**
   * Whether the project should be featured on the homepage
   */
  featured?: boolean;

  /**
   * The date the project was created or started in W3C format
   * (this will determine the sort order of the projects)
   */
  timestamp: string;

  /**
   * The URL of the project on the website
   * (eg. https://zaggonaut.dev/projects/my-project)
   */
  filename: string;
};

export type ArticleFrontmatter = {
  /**
   * The title of the article
   */
  title: string;

  /**
   * THe summary description of the article
   */
  description: string;

  /**
   * The tags of the article
   * (eg. ["JavaScript", "React", "Node.js"])
   */
  tags?: string[];

  /**
   * The estimated time to read the article in minutes
   */
  time: number;

  /**
   * Whether the article should be featured on the homepage
   */
  featured: boolean;

  /**
   * The timestamp the article was published in W3C format
   */
  timestamp: string;

  /**
   * The URL of the article on the website
   * (eg. https://zaggonaut.dev/blog/my-article)
   */
  filename: string;
};

export type ExperienceFrontmatter = {
  /**
   * The company name
   */
  company: string;

  /**
   * The position/role title
   */
  position: string;

  /**
   * The description of the role and responsibilities
   */
  description: string;

  /**
   * The location of the job (e.g., "Remote", "New York, NY")
   */
  location: string;

  /**
   * Employment type (e.g., "Full-time", "Part-time", "Contract", "Internship")
   */
  type: string;

  /**
   * The skills/technologies used in this role
   */
  skills?: string[];

  /**
   * The company website URL
   */
  companyUrl?: string;

  /**
   * Start date of employment
   */
  startDate: string;

  /**
   * End date of employment (use "Present" for current roles)
   */
  endDate: string;

  /**
   * Whether the experience should be featured on the homepage
   */
  featured?: boolean;

  /**
   * The timestamp for sorting purposes
   */
  timestamp: string;

  /**
   * The URL of the experience on the website
   */
  filename: string;
};
