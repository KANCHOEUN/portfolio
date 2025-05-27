import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';


export default function Toggle({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-2">
      <div
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer font-medium select-none flex items-center"
      >
        <span className={`mr-2 transition-transform ${open ? 'rotate-90' : ''}`}><ChevronRightIcon size={18}></ChevronRightIcon></span>
        {title}
      </div>
      {open && <div className="pl-6 mt-2">{children}</div>}
    </div>
  );
} 