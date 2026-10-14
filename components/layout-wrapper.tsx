"use client";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import SidebarNavigation from "./sidebar-navigation";
import Footer from "./footer";
export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const change = () => {
      setMobile(query.matches);
      setShowSidebar(false);
    };
    change();
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return (
    <div className="workspace-layout">
      {mobile && (
        <button
          aria-label={showSidebar ? "탐색 메뉴 닫기" : "탐색 메뉴 열기"}
          aria-expanded={showSidebar}
          aria-controls="site-sidebar"
          onClick={() => setShowSidebar((value) => !value)}
          className="fixed bottom-4 left-4 z-40 p-3 bg-[var(--surface)] rounded-full shadow-lg"
        >
          {showSidebar ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      {(!mobile || showSidebar) && (
        <div
          id="site-sidebar"
          className={mobile ? "fixed inset-0 z-30" : "hidden md:block relative shrink-0"}
        >
          <SidebarNavigation
            isMobile={mobile}
            onItemClick={mobile ? () => setShowSidebar(false) : undefined}
          />
        </div>
      )}
      <div className="workspace-main" hidden={mobile && showSidebar}>
        <div className="workspace-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
