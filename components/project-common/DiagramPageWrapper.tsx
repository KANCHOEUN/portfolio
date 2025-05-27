import { useLanguage } from "@/contexts/language-context";
import { List } from "lucide-react";


export default function DiagramPageWrapper({
  title,
  description,
  toc,
  children,
}: {
  title: string;
  description: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
    const { t, language } = useLanguage()

      // 목차 클릭 핸들러
  const handleTocClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="mb-4">{description}</p>
        <div key="toc" className="mb-6 p-4 bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] rounded">
            <div className="flex items-center mb-3">
                <List size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] mr-2" />
                <h3 className="text-lg font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">목차</h3>
            </div>
            <ul className="space-y-2">
                {toc.map((item: any, index: number) => (
                    <li key={index}>
                        <button
                        onClick={() => handleTocClick(item.id)}
                        className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] hover:text-[#56b6c2] dark:hover:text-[#56b6c2] light:hover:text-[#0184bc] transition-colors text-left"
                        >
                        {index + 1}. {t(item.label)}
                        </button>
                    </li>
                    ))}
            </ul>
        </div>
        <div>{children}</div>
    </div>
  );
} 