// components/products/variants/Attribute_Builder.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import App_Select from "@/components/app_ui/App_Select";
import { predefinedAttributes } from "../../products_data/product_data";
import { ProductAttribute } from "../../products_data/product_types";

type Props = {
  attributes: ProductAttribute[];
  onChange: (attrs: ProductAttribute[]) => void;
};

const Attribute_Builder = ({ attributes, onChange }: Props) => {
  const [newOptionValues, setNewOptionValues] = useState<
    Record<string, string>
  >({});

  const addAttribute = () => {
    const newAttr: ProductAttribute = {
      id: `attr-${Date.now()}`,
      name: "",
      options: [],
    };
    onChange([...attributes, newAttr]);
  };

  const updateAttributeName = (id: string, name: string) => {
    onChange(attributes.map((a) => (a.id === id ? { ...a, name } : a)));
  };

  const removeAttribute = (id: string) => {
    onChange(attributes.filter((a) => a.id !== id));
  };

  const addOption = (attrId: string) => {
    const value = newOptionValues[attrId]?.trim();
    if (!value) return;

    onChange(
      attributes.map((a) => {
        if (a.id !== attrId) return a;
        // Don't add duplicates
        if (
          a.options.some((o) => o.value.toLowerCase() === value.toLowerCase())
        )
          return a;
        return {
          ...a,
          options: [...a.options, { id: `opt-${Date.now()}`, value }],
        };
      }),
    );

    setNewOptionValues((prev) => ({ ...prev, [attrId]: "" }));
  };

  const removeOption = (attrId: string, optId: string) => {
    onChange(
      attributes.map((a) =>
        a.id === attrId
          ? { ...a, options: a.options.filter((o) => o.id !== optId) }
          : a,
      ),
    );
  };

  const attrSelectData = predefinedAttributes
    .filter((name) => name !== "Custom")
    .map((name) => ({ label: name, key: name }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <App_Text variant="tableCell" className="font-semibold">
            Define Attributes
          </App_Text>
          <App_Text variant="tableCellMuted">
            Add the attributes that make each variant different (e.g. Size,
            Color).
          </App_Text>
        </div>
        <App_Button
          text="Add Attribute"
          icon={<Plus size={13} />}
          type="button"
          onPress={addAttribute}
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
        />
      </div>

      {attributes.length === 0 && (
        <div className="border-2 border-dashed border-[#ede8e2] rounded-2xl py-8 text-center">
          <App_Text variant="tableCellMuted">
            No attributes yet. Click "Add Attribute" to get started.
          </App_Text>
        </div>
      )}

      {attributes.map((attr) => (
        <div
          key={attr.id}
          className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            {/* Attribute name — predefined or custom */}
            <div className="w-48 flex-shrink-0">
              <App_Select
                data={[
                  ...attrSelectData,
                  { label: "Custom...", key: "Custom" },
                ]}
                value={attr.name}
                placeholder="Select attribute"
                title=""
                onChange={(val) =>
                  updateAttributeName(attr.id, val === "Custom" ? "" : val)
                }
                style="gap-0"
              />
            </div>

            {/* Custom name input */}
            {(!predefinedAttributes.includes(attr.name) ||
              attr.name === "") && (
              <input
                value={attr.name}
                onChange={(e) => updateAttributeName(attr.id, e.target.value)}
                placeholder="e.g. Frame Type"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-primary"
              />
            )}

            <button
              type="button"
              onClick={() => removeAttribute(attr.id)}
              className="p-1.5 rounded hover:bg-[#fdecea] text-[#c0392b] flex-shrink-0 ml-auto"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-2 items-center">
            {attr.options.map((opt) => (
              <span
                key={opt.id}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#e0dbd4] text-[#1e1a17]"
              >
                {opt.value}
                <button
                  type="button"
                  onClick={() => removeOption(attr.id, opt.id)}
                  className="text-muted-foreground hover:text-[#c0392b] transition-colors"
                >
                  <X size={11} />
                </button>
              </span>
            ))}

            {/* Add option inline */}
            <div className="flex items-center gap-1.5">
              <input
                value={newOptionValues[attr.id] ?? ""}
                onChange={(e) =>
                  setNewOptionValues((prev) => ({
                    ...prev,
                    [attr.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addOption(attr.id);
                  }
                }}
                placeholder={`Add ${attr.name || "value"}...`}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none focus:border-primary w-36"
              />
              <button
                type="button"
                onClick={() => addOption(attr.id)}
                className="text-xs text-primary hover:underline"
              >
                + Add
              </button>
            </div>
          </div>

          {attr.options.length === 0 && (
            <App_Text variant="tableCellMuted" className="text-[11px]">
              Type a value and press Enter or click "+ Add"
            </App_Text>
          )}
        </div>
      ))}
    </div>
  );
};

export default Attribute_Builder;
