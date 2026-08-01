// components/products/add/steps/Step_Variants.tsx
"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, ChevronRight, RotateCcw } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import {
  VariantCombination,
  AttributeDef,
  generateCombinations,
} from "../add_product_types";
import { useProductContext } from "@/app/contexts/admin/Product_Context";

type Props = {
  baseSku: string;
  basePrice: number;
  // onChange: (variants: VariantCombination[]) => void;
  initialVariants?: VariantCombination[];
};

// Predefined attribute names — admin can also type a custom one
const PRESET_ATTRIBUTES = [
  "Size",
  "Color",
  "Material",
  "Style",
  "Finish",
  "Weight",
];

type Stage = "attributes" | "combinations" | "pricing";

const Step_Variants = ({
  baseSku,
  basePrice,
  // onChange,
  initialVariants = [],
}: Props) => {
  const [stage, setStage] = useState<Stage>("attributes");
  const [attributes, setAttributes] = useState<AttributeDef[]>([]);
  const [combinations, setCombinations] =
    useState<VariantCombination[]>(initialVariants);
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkStock, setBulkStock] = useState("");
  const { form } = useProductContext();

  const onChange = (variants: VariantCombination[]) =>
    form.setValue("variants", variants);

  // ── Attribute management ─────────────────────────────────────────
  const addAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", values: [] },
    ]);
  };

  const updateAttributeName = (id: string, name: string) => {
    setAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name } : a)),
    );
  };

  const removeAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((a) => a.id !== id));
  };

  const addValue = (attrId: string, value: string) => {
    if (!value.trim()) return;
    setAttributes((prev) =>
      prev.map((a) =>
        a.id === attrId && !a.values.includes(value.trim())
          ? { ...a, values: [...a.values, value.trim()] }
          : a,
      ),
    );
  };

  const removeValue = (attrId: string, value: string) => {
    setAttributes((prev) =>
      prev.map((a) =>
        a.id === attrId
          ? { ...a, values: a.values.filter((v) => v !== value) }
          : a,
      ),
    );
  };

  // ── Validation guards ─────────────────────────────────────────────
  const canGenerate =
    attributes.length > 0 &&
    attributes.every((a) => a.name.trim() !== "" && a.values.length > 0);

  const handleGenerate = () => {
    const generated = generateCombinations(attributes, basePrice, baseSku);
    setCombinations(generated);
    onChange(generated);
    setStage("combinations");
  };

  const handleRegenerate = () => {
    // Warn: regenerating clears existing prices — but we'll just do it
    const generated = generateCombinations(attributes, basePrice, baseSku);
    setCombinations(generated);
    onChange(generated);
  };

  // ── Combination management ─────────────────────────────────────────
  const toggleIncluded = (id: string) => {
    setCombinations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, included: !c.included } : c)),
    );
  };

  const canProceedToPricing =
    combinations.length > 0 && combinations.some((c) => c.included);

  // ── Pricing management ─────────────────────────────────────────────
  const updateVariant = (
    id: string,
    field: "price" | "stock" | "sku",
    value: number | string,
  ) => {
    setCombinations((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      );
      onChange(updated);
      return updated;
    });
  };

  const applyBulkPrice = () => {
    if (!bulkPrice) return;
    const price = Number(bulkPrice);
    setCombinations((prev) => {
      const updated = prev.map((c) => (c.included ? { ...c, price } : c));
      onChange(updated);
      return updated;
    });
  };

  const applyBulkStock = () => {
    if (!bulkStock) return;
    const stock = Number(bulkStock);
    setCombinations((prev) => {
      const updated = prev.map((c) => (c.included ? { ...c, stock } : c));
      onChange(updated);
      return updated;
    });
  };

  const includedCount = combinations.filter((c) => c.included).length;

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Product Variants
        </App_Text>
        <App_Text variant="pageSub">
          Define attributes and let the system generate all combinations.
        </App_Text>
      </div>

      {/* Stage indicators */}
      <div className="flex items-center gap-2">
        {(["attributes", "combinations", "pricing"] as Stage[]).map((s, i) => {
          const labels = [
            "1. Define Attributes",
            "2. Review Combinations",
            "3. Set Prices & Stock",
          ];
          const isActive = stage === s;
          const isCompleted =
            (s === "attributes" &&
              (stage === "combinations" || stage === "pricing")) ||
            (s === "combinations" && stage === "pricing");

          return (
            <div key={s} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isCompleted) setStage(s);
                }}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : isCompleted
                      ? "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                      : "bg-[#f5f2ee] text-muted-foreground cursor-not-allowed"
                }`}
              >
                {labels[i]}
              </button>
              {i < 2 && (
                <ChevronRight
                  size={13}
                  className="text-muted-foreground flex-shrink-0"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── STAGE 1 — Define Attributes ─────────────────────────── */}
      {stage === "attributes" && (
        <div className="space-y-4">
          {attributes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#ede8e2] rounded-2xl gap-2">
              <App_Text variant="tableCellMuted">
                No attributes added yet.
              </App_Text>
              <App_Text variant="tableCellMuted">
                Add an attribute like Size or Color to get started.
              </App_Text>
            </div>
          )}

          {attributes.map((attr) => (
            <Attribute_Builder
              key={attr.id}
              attr={attr}
              presets={PRESET_ATTRIBUTES}
              onNameChange={(name) => updateAttributeName(attr.id, name)}
              onAddValue={(val) => addValue(attr.id, val)}
              onRemoveValue={(val) => removeValue(attr.id, val)}
              onRemove={() => removeAttribute(attr.id)}
            />
          ))}

          <App_Button
            text="Add Attribute"
            icon={<Plus size={13} />}
            type="button"
            onPress={addAttribute}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />

          {/* Summary of what will generate */}
          {canGenerate && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 space-y-1">
              <App_Text
                variant="tableCell"
                className="font-medium text-primary"
              >
                Ready to generate
              </App_Text>
              <App_Text variant="tableCellMuted">
                {cartesianCount(attributes)} combinations will be created from:
                {attributes.map((a) => (
                  <span key={a.id} className="ml-1">
                    <span className="font-medium text-[#1e1a17]">{a.name}</span>{" "}
                    ({a.values.join(", ")})
                  </span>
                ))}
              </App_Text>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <App_Button
              text={`Generate ${canGenerate ? cartesianCount(attributes) : ""} Combinations`}
              type="button"
              onPress={handleGenerate}
              btnStyle={`text-xs rounded-lg px-4 py-2 h-auto ${
                canGenerate
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-[#f5f2ee] text-muted-foreground cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      )}

      {/* ── STAGE 2 — Review Combinations ───────────────────────── */}
      {stage === "combinations" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <App_Text variant="tableCell" className="font-medium">
              {combinations.length} combinations generated — {includedCount}{" "}
              included
            </App_Text>
            <button
              type="button"
              onClick={() => setStage("attributes")}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <RotateCcw size={12} /> Edit attributes
            </button>
          </div>

          <App_Text variant="tableCellMuted">
            Uncheck any combinations you don't want to sell.
          </App_Text>

          <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ede8e2] bg-[#faf9f7]">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={combinations.every((c) => c.included)}
                      onChange={(e) =>
                        setCombinations((prev) =>
                          prev.map((c) => ({
                            ...c,
                            included: e.target.checked,
                          })),
                        )
                      }
                      className="accent-primary w-4 h-4"
                    />
                  </th>
                  <th className="text-left py-3 px-4">
                    <App_Text variant="tableHeader">Combination</App_Text>
                  </th>
                  {attributes.map((a) => (
                    <th key={a.id} className="text-left py-3 px-4">
                      <App_Text variant="tableHeader">{a.name}</App_Text>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {combinations.map((combo) => (
                  <tr
                    key={combo.id}
                    className={`border-b border-[#f5f2ee] last:border-0 transition-colors ${
                      combo.included
                        ? "hover:bg-[#faf9f7]"
                        : "opacity-40 bg-[#faf9f7]"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={combo.included}
                        onChange={() => toggleIncluded(combo.id)}
                        className="accent-primary w-4 h-4"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <App_Text variant="tableCell" className="font-medium">
                        {combo.label}
                      </App_Text>
                    </td>
                    {attributes.map((a) => (
                      <td key={a.id} className="py-3 px-4">
                        <span className="text-xs px-2 py-1 rounded-lg bg-[#f5f2ee] text-[#1e1a17]">
                          {combo.combination[a.name]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <App_Text variant="tableCellMuted">
              {includedCount} of {combinations.length} combinations will be
              active
            </App_Text>
            <App_Button
              text="Continue to Pricing"
              type="button"
              onPress={() => canProceedToPricing && setStage("pricing")}
              btnStyle={`text-xs rounded-lg px-4 py-2 h-auto ${
                canProceedToPricing
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-[#f5f2ee] text-muted-foreground cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      )}

      {/* ── STAGE 3 — Set Prices & Stock ────────────────────────── */}
      {stage === "pricing" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <App_Text variant="tableCell" className="font-medium">
              Set price and stock for each variant
            </App_Text>
            <button
              type="button"
              onClick={() => setStage("combinations")}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <RotateCcw size={12} /> Review combinations
            </button>
          </div>

          {/* Bulk fill */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
            <App_Text variant="tableCell" className="font-medium col-span-2">
              Bulk fill (applies to all included variants)
            </App_Text>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
                placeholder="Price for all"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
              />
              <App_Button
                text="Apply"
                type="button"
                onPress={applyBulkPrice}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={bulkStock}
                onChange={(e) => setBulkStock(e.target.value)}
                placeholder="Stock for all"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
              />
              <App_Button
                text="Apply"
                type="button"
                onPress={applyBulkStock}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
              />
            </div>
          </div>

          {/* Per-variant pricing table */}
          <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ede8e2] bg-[#faf9f7]">
                  <th className="text-left py-3 px-4">
                    <App_Text variant="tableHeader">Variant</App_Text>
                  </th>
                  <th className="text-left py-3 px-4">
                    <App_Text variant="tableHeader">SKU</App_Text>
                  </th>
                  <th className="text-left py-3 px-4">
                    <App_Text variant="tableHeader">Price (R)</App_Text>
                  </th>
                  <th className="text-left py-3 px-4">
                    <App_Text variant="tableHeader">Stock</App_Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {combinations
                  .filter((c) => c.included)
                  .map((combo) => (
                    <tr
                      key={combo.id}
                      className="border-b border-[#f5f2ee] last:border-0"
                    >
                      <td className="py-3 px-4">
                        <App_Text variant="tableCell" className="font-medium">
                          {combo.label}
                        </App_Text>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          value={combo.sku}
                          onChange={(e) =>
                            updateVariant(combo.id, "sku", e.target.value)
                          }
                          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white outline-none focus:border-primary"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                            R
                          </span>
                          <input
                            type="number"
                            value={combo.price || ""}
                            onChange={(e) =>
                              updateVariant(
                                combo.id,
                                "price",
                                Number(e.target.value),
                              )
                            }
                            placeholder="0"
                            className={`w-full text-sm border rounded-lg pl-6 pr-3 py-1.5 bg-white outline-none focus:border-primary ${
                              !combo.price
                                ? "border-[#c0392b] bg-[#fdecea]"
                                : "border-gray-200"
                            }`}
                          />
                        </div>
                        {!combo.price && (
                          <p className="text-[10px] text-[#c0392b] mt-0.5">
                            Price required
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={combo.stock || ""}
                          onChange={(e) =>
                            updateVariant(
                              combo.id,
                              "stock",
                              Number(e.target.value),
                            )
                          }
                          placeholder="0"
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white outline-none focus:border-primary"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Variants", value: `${includedCount} active` },
              {
                label: "From price",
                value: `R${Math.min(...combinations.filter((c) => c.included && c.price > 0).map((c) => c.price)).toLocaleString()}`,
              },
              {
                label: "Total stock",
                value: combinations
                  .filter((c) => c.included)
                  .reduce((s, c) => s + c.stock, 0)
                  .toLocaleString(),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 text-center"
              >
                <App_Text variant="tableCellMuted">{label}</App_Text>
                <App_Text variant="tableCell" className="font-semibold mt-1">
                  {value}
                </App_Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Attribute Builder sub-component ──────────────────────────────────────
type AttributeBuilderProps = {
  attr: AttributeDef;
  presets: string[];
  onNameChange: (name: string) => void;
  onAddValue: (val: string) => void;
  onRemoveValue: (val: string) => void;
  onRemove: () => void;
};

const Attribute_Builder = ({
  attr,
  presets,
  onNameChange,
  onAddValue,
  onRemoveValue,
  onRemove,
}: AttributeBuilderProps) => {
  const [valueInput, setValueInput] = useState("");
  const [showPresets, setShowPresets] = useState(false);

  const handleAddValue = () => {
    onAddValue(valueInput);
    setValueInput("");
  };

  const unusedPresets = presets.filter(
    (p) =>
      !["Size", "Color", "Material", "Style", "Finish", "Weight"]
        .slice(0, presets.indexOf(p))
        .includes(p),
  );

  return (
    <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-3">
      <div className="flex items-center gap-3">
        {/* Attribute name — type or pick from presets */}
        <div className="relative flex-1">
          <input
            value={attr.name}
            onChange={(e) => onNameChange(e.target.value)}
            onFocus={() => setShowPresets(true)}
            onBlur={() => setTimeout(() => setShowPresets(false), 150)}
            placeholder="Attribute name (e.g. Size)"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
          />
          {showPresets && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ede8e2] rounded-xl shadow-lg z-20 overflow-hidden">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onMouseDown={() => {
                    onNameChange(preset);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-[#f5f2ee] transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-[#fdecea] text-[#c0392b] flex-shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Values */}
      <div className="space-y-2">
        <App_Text variant="tableCellMuted">Values</App_Text>
        <div className="flex flex-wrap gap-1.5">
          {attr.values.map((val) => (
            <span
              key={val}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20"
            >
              {val}
              <button
                type="button"
                onClick={() => onRemoveValue(val)}
                className="hover:text-[#c0392b] transition-colors ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
          {attr.values.length === 0 && (
            <App_Text variant="tableCellMuted" className="text-[11px]">
              No values yet — add some below
            </App_Text>
          )}
        </div>

        {/* Value input */}
        <div className="flex gap-2">
          <input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddValue();
              }
            }}
            placeholder='Type a value and press Enter (e.g. "Small")'
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
          />
          <App_Button
            text="Add"
            type="button"
            onPress={handleAddValue}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

// helper — just count without generating
const cartesianCount = (attributes: AttributeDef[]): number =>
  attributes.reduce(
    (total, attr) => total * Math.max(attr.values.length, 1),
    1,
  );

export default Step_Variants;

// // components/products/create/steps/Step_Variants.tsx
// "use client";

// import { useState } from "react";
// import { Info } from "lucide-react";
// import App_Text from "@/components/app_ui/App_Text";
// import Settings_Toggle from "../../../settings_view/email_view/email_components/Settings_Toggle";
// import {
//   ProductAttribute,
//   VariantCombination,
// } from "../../products_data/product_types";
// import Attribute_Builder from "./Attribute_Builder";
// import Variant_Combinations_Table from "./Variant_Combinations_Table";
// import { useProductContext } from "@/app/contexts/admin/Product_Context";

// type Props = {
//   hasVariants: boolean;
//   onToggle: (val: boolean) => void;
//   attributes: ProductAttribute[];
//   onAttrChange: (attrs: ProductAttribute[]) => void;
//   combinations: VariantCombination[];
//   onComboChange: (combos: VariantCombination[]) => void;
// };

// const Step_Variants = () => {
//   const {
//     hasVariants,
//     setHasVariants: onToggle,
//     attributes,
//     setAttributes: onAttrChange,
//     combinations,
//     setCombinations: onComboChange,
//   } = useProductContext();
//   return (
//     <div className="space-y-5">
//       <div>
//         <App_Text variant="cardHeading" className="text-base mb-0.5">
//           Variants
//         </App_Text>
//         <App_Text variant="pageSub">
//           Does this product come in different sizes, colors or materials?
//         </App_Text>
//       </div>

//       {/* Toggle */}
//       <div className="flex items-center justify-between p-4 bg-[#faf9f7] rounded-xl border border-[#ede8e2]">
//         <div>
//           <App_Text variant="tableCell" className="font-semibold">
//             This product has variants
//           </App_Text>
//           <App_Text variant="tableCellMuted">
//             Enable if you sell this product in different sizes, colors,
//             materials, etc.
//           </App_Text>
//         </div>
//         <Settings_Toggle value={hasVariants} onChange={onToggle} />
//       </div>

//       {/* No variants — simple price/stock notice */}
//       {!hasVariants && (
//         <div className="flex items-start gap-3 p-4 bg-[#edf2fb] rounded-xl border border-[#c8d8f5]">
//           <Info size={16} className="text-[#3266ad] flex-shrink-0 mt-0.5" />
//           <App_Text variant="tableCellMuted" className="text-[#3266ad]">
//             No variants — this product will have a single price and stock count,
//             set in the Pricing & Inventory step.
//           </App_Text>
//         </div>
//       )}

//       {/* Variant builder */}
//       {hasVariants && (
//         <div className="space-y-6">
//           <Attribute_Builder attributes={attributes} onChange={onAttrChange} />

//           {combinations.length > 0 && (
//             <div className="border-t border-[#ede8e2] pt-6">
//               <Variant_Combinations_Table
//                 attributes={attributes}
//                 combinations={combinations}
//                 onChange={onComboChange}
//               />
//             </div>
//           )}

//           {attributes.length > 0 && combinations.length === 0 && (
//             <div className="flex items-start gap-3 p-4 bg-[#fdf5e0] rounded-xl border border-[#f5e0a0]">
//               <Info size={16} className="text-[#8a6300] flex-shrink-0 mt-0.5" />
//               <App_Text variant="tableCellMuted" className="text-[#8a6300]">
//                 Add at least one value to each attribute to generate
//                 combinations.
//               </App_Text>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step_Variants;

// // // components/products/add/steps/Step_Variants.tsx
// // "use client";

// // import App_Button from "@/components/app_ui/App_Button";
// // import App_Text from "@/components/app_ui/App_Text";
// // import { Plus } from "lucide-react";
// // import { UseFormReturn } from "react-hook-form";
// // import { ProductFormData } from "../add_product_types";

// // type Props = { form: UseFormReturn<ProductFormData> };

// // const Step_Variants = ({ form }: Props) => {
// //   const { register } = form;
// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <App_Text variant="cardHeading" className="text-base mb-0.5">
// //           Variants
// //         </App_Text>
// //         <App_Text variant="pageSub">
// //           Add product variations like color, size or material.
// //         </App_Text>
// //       </div>

// //       <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-[#ede8e2] bg-[#faf9f7]">
// //         <input
// //           type="checkbox"
// //           {...register("hasVariants")}
// //           className="w-4 h-4 accent-primary"
// //         />
// //         <div>
// //           <App_Text variant="tableCell" className="font-medium">
// //             This product has variants
// //           </App_Text>
// //           <App_Text variant="tableCellMuted">
// //             Enable if product comes in different options
// //           </App_Text>
// //         </div>
// //       </label>

// //       <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-[#ede8e2] rounded-2xl gap-3">
// //         <App_Text variant="tableCellMuted">No variants added yet</App_Text>
// //         <App_Button
// //           text="Add Variant"
// //           icon={<Plus size={13} />}
// //           btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Step_Variants;
