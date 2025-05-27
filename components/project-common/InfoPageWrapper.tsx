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
        <div className="p-6">
            <div className="flex items-center mb-4">
                <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mr-3">{title}</h1>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] hover:text-[#61afef] dark:hover:text-[#61afef] light:hover:text-[#4078f2] transition-colors h-full"
                    title="GitHub Repository">
                    <Github size={20} className="bottom-0" />
                </a>
            </div>
            <div className="flex items-center my-2 px-1">
                <Calendar size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] mr-2" />
                <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium">
                    {period}
                </span>
            </div>
            <div className="mt-3 mb-4">
                {techStack.map((tech) => (
                    <span key={tech} className="inline-block bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {tech}
                    </span>
                ))}
            </div>
            <div>{children}</div>
        </div>
    );
} 