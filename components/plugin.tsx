// "use client";

// import React, { useEffect } from "react";

// export default function PluginComponent() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       (window as any).Jupiter.init({
//         displayMode: "widget",
//         integratedTargetId: "jupiter-plugin",
//       });
//     }
//   }, []);

//   return (
//     <div>

//       <div
//         id="jupiter-plugin"
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect } from "react";

export default function PluginComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const Jupiter = (window as any).Jupiter;

        if (Jupiter) {
          // Initialize WITHOUT wallet injection (safe mode)
          Jupiter.init({
            displayMode: "widget",
            integratedTargetId: "jupiter-plugin",

            // Recommended safe options
            enableWalletIntegration: false,
            strictMode: false
          });

          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <div id="jupiter-plugin" />
    </div>
  );
}

