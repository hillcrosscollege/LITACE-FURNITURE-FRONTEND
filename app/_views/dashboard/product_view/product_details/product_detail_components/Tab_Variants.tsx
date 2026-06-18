// components/products/details/tabs/Tab_Variants.tsx
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Table from "@/components/app_ui/App_Table";
import App_Text from "@/components/app_ui/App_Text";
import { variants, variantAttributes } from "../product_detail_data";
import { variantColumns } from "../product_detail_data/product_variant_col";

const Tab_Variants = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <App_Text variant="cardHeading">Product Variants</App_Text>
            <App_Text variant="tableCellMuted" className="mt-0.5">
              Manage product variations (size, color, material).
            </App_Text>
          </div>
          <App_Button
            text="Add Variant"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowModal(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>

        {/* Variants table */}
        <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
          <App_Table
            columns={variantColumns}
            data={variants}
            style="mt-0"
            childRowStyle="hover:bg-[#faf9f7]"
          />
        </div>

        {/* Variant Attributes */}
        <div className="space-y-3">
          <App_Text variant="cardHeading">Variant Attributes</App_Text>
          <div className="flex flex-col gap-3">
            {variantAttributes.map((attr) => (
              <div
                key={attr.id}
                className="flex items-center justify-between p-4 rounded-xl border border-[#ede8e2] bg-[#faf9f7]"
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <App_Text
                    variant="tableCell"
                    className="font-semibold w-24 shrink-0"
                  >
                    {attr.name}
                  </App_Text>
                  <div className="flex items-center gap-2 flex-wrap">
                    {attr.values.map((val) => (
                      <span
                        key={val}
                        className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e0dbd4] text-[#1e1a17]"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <App_Button
                    text=""
                    icon={<Pencil size={13} />}
                    type="button"
                    btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 rounded shadow-none border-0"
                  />
                  <App_Button
                    text=""
                    icon={<Trash2 size={13} />}
                    type="button"
                    btnStyle="p-1.5 h-auto bg-transparent text-muted-foreground hover:text-[#c0392b] hover:bg-[#fdecea] rounded shadow-none border-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* {showModal && <Add_Variant_Modal onClose={() => setShowModal(false)} />} */}
    </>
  );
};

export default Tab_Variants;
