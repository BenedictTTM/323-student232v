import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function WarningBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      id="student-project-warning-banner"
      className="relative bg-amber-500 text-black text-center text-sm font-medium py-2.5 px-10"
    >
      <span className="inline-flex items-center gap-2">
        <AlertTriangle size={16} strokeWidth={2.5} />
        <span>
          ⚠️ This is a <strong>student project</strong> built for educational
          purposes only. It is <strong>not affiliated with Coinbase</strong> in
          any way.
        </span>
      </span>
      <button
        id="dismiss-warning-banner"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-amber-600/30 transition-colors cursor-pointer"
        aria-label="Dismiss warning"
      >
        <X size={16} />
      </button>
    </div>
  );
}
