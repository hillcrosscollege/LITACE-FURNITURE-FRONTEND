"use client";

import { Loader2 } from "lucide-react";

const App_Loader = ({ label = "Loading data..." }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <Loader2 size={24} className="text-primary animate-spin" />
    {/* <App_Text variant="tableCellMuted">{label}</App_Text> */}
  </div>
);

export default App_Loader;
