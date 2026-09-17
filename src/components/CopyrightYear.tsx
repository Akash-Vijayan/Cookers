"use client";

import { Suspense, useState, useEffect } from "react";

function CurrentYear() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    const t = setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return <>{year}</>;
}

export default function CopyrightYear() {
  return (
    <Suspense fallback={<>2026</>}>
      <CurrentYear />
    </Suspense>
  );
}
