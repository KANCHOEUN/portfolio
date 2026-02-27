export type ProjectIcon = "pig" | "fish" | "leaf" | "bot";

export interface ProjectPage {
  id: string;
  name: string;
  type: "intro" | "diagram" | "related";
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface ProjectMeta {
  id: string;
  slug: string;
  name: string;
  period: string;
  techStack: string[];
  githubUrl: string;
  icon: ProjectIcon;
  pages: ProjectPage[];
  relatedPosts: BlogPost[];  // 블로그 포스트를 직접 포함
}
