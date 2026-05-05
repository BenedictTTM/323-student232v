import { ShieldAlert } from "lucide-react";

export default function DemoDisclaimer() {
  return (
    <div
      id="demo-disclaimer-footer"
      className="bg-gray-950 border-t border-gray-800 text-gray-400 text-center text-xs py-4 px-4"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
        <ShieldAlert size={18} className="text-amber-500" />
        <p className="leading-relaxed">
          <strong className="text-amber-400">Disclaimer:</strong> This is a{" "}
          <strong>demo / student project</strong> created for educational
          purposes only. It is not a real cryptocurrency exchange and is not
          affiliated with or endorsed by Coinbase, Inc. Please{" "}
          <strong>do not enter real personal information</strong>, financial
          data, or genuine credentials. All data shown is simulated.
        </p>
      </div>
    </div>
  );
}
