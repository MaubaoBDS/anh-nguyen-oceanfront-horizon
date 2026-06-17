import { useEffect } from "react";

/**
 * CalculatorPage – renders the standalone investment calculator
 * by injecting calc.css and calc.js into the page.
 * Uses a dedicated mount div (#calc-root) to avoid conflicts with the main React app (#root).
 */
export default function CalculatorPage() {
  useEffect(() => {
    // Inject CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/calc.css";
    link.id = "calc-stylesheet";
    if (!document.getElementById("calc-stylesheet")) {
      document.head.appendChild(link);
    }

    // Inject JS as module
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/calc.js";
    script.id = "calc-script";
    if (!document.getElementById("calc-script")) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      document.getElementById("calc-stylesheet")?.remove();
      document.getElementById("calc-script")?.remove();
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: "transparent",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div id="calc-root" />
    </div>
  );
}
