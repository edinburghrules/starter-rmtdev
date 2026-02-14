import { createContext, useEffect, useState } from "react";

export const ActiveIdContext = createContext<{ activeJobId: number | null } | null>(null);

export default function ActiveIdContextProvider({ children }: { children: React.ReactNode }) {
  const [activeJobId, setActiveJobId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const jobId = +window.location.hash.slice(1);
      setActiveJobId(jobId);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return <ActiveIdContext.Provider value={{ activeJobId }}>{children}</ActiveIdContext.Provider>;
}
