"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Text from "@/components/app_ui/App_Text";
import { useToggleEmailTemplate } from "../email_hooks/useEmailMutation";
import { useEmailTemplates } from "../email_hooks/useEmailQueries";
import Email_Template_Modal from "../email_modals/Email_Template_Modal";
import { EmailTemplate } from "../email_types";
import Settings_Toggle from "./Settings_Toggle";
import App_Loader from "@/components/app_ui/App_Loader";

const Email_Templates_Tab = () => {
  const { data: templates, isLoading } = useEmailTemplates();
  const { mutate: toggleTemplate } = useToggleEmailTemplate();
  const [editTemplate, setEditTemplate] = useState<EmailTemplate | null>(null);

  if (isLoading || !templates)
    return <App_Loader label="Loading email templates..." />;

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm divide-y divide-[#f5f2ee]">
        {templates.map((template) => (
          <div key={template.id} className="flex items-center gap-3 p-4">
            {/* Status dot */}
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${template.status ? "bg-[#2e7d52]" : "bg-[#c0392b]"}`}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <App_Text variant="tableCell" className="font-medium">
                {template.name}
              </App_Text>
              <App_Text variant="tableCellMuted">
                {template.description}
              </App_Text>
            </div>

            {/* Status badge */}
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                template.status
                  ? "bg-[#e8fdf0] text-[#157a45]"
                  : "bg-[#fdecea] text-[#a32020]"
              }`}
            >
              {template.status ? "Active" : "Inactive"}
            </span>

            {/* Toggle */}
            <Settings_Toggle
              value={template.status}
              onChange={(v) => toggleTemplate({ id: template.id, status: v })}
            />

            {/* More */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors"
                >
                  <MoreHorizontal size={15} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-xs"
                  onClick={() => setEditTemplate(template)}
                >
                  <Pencil size={13} /> Edit Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      {editTemplate && (
        <Email_Template_Modal
          template={editTemplate}
          onClose={() => setEditTemplate(null)}
        />
      )}
    </>
  );
};

export default Email_Templates_Tab;
