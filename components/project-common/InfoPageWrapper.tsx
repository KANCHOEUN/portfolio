import { Github, Calendar } from "lucide-react";

export default function InfoPageWrapper({
  title,
  githubUrl,
  period,
  techStack,
  children,
}: {
  title: string;
  githubUrl: string;
  period: string;
  techStack: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 max-w-5xl w-full mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mr-3">
          {title}
        </h1>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--foreground)] hover:text-[var(--blue)] transition-colors h-full"
          title="GitHub Repository"
        >
          <Github size={20} className="bottom-0" />
        </a>
      </div>
      <div className="flex items-center my-2 px-1">
        <Calendar size={16} className="text-[var(--green)] mr-2" />
        <span className="text-[var(--foreground)] font-medium">{period}</span>
      </div>
      <div className="mt-3 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="inline-block bg-[var(--elevated)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {tech}
          </span>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
