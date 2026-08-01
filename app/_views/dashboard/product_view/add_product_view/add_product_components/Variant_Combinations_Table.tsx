// components/products/variants/Variant_Combinations_Table.tsx
"use client";

import { useEffect, useState } from "react";
import App_Text from "@/components/app_ui/App_Text";
import { generateCombinations } from "../../products_data/product_data";
import {
  ProductAttribute,
  VariantCombination,
} from "../../products_data/product_types";

type Props = {
  attributes: ProductAttribute[];
  combinations: VariantCombination[];
  onChange: (combos: VariantCombination[]) => void;
};

const Variant_Combinations_Table = ({
  attributes,
  combinations,
  onChange,
}: Props) => {
  // Regenerate combinations when attributes change
  // but preserve any prices/stock the admin already typed
  useEffect(() => {
    const generated = generateCombinations(attributes);

    const merged = generated.map((newCombo) => {
      // If this exact combination already exists, keep its price/stock/sku
      const existing = combinations.find((c) => c.label === newCombo.label);
      return existing
        ? {
            ...newCombo,
            price: existing.price,
            stock: existing.stock,
            sku: existing.sku,
            enabled: existing.enabled,
          }
        : newCombo;
    });

    onChange(merged);
  }, [attributes]);

  if (combinations.length === 0) return null;

  const updateCombo = (
    id: string,
    field: keyof VariantCombination,
    value: any,
  ) => {
    onChange(
      combinations.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const toggleAll = (enabled: boolean) => {
    onChange(combinations.map((c) => ({ ...c, enabled })));
  };

  const enabledCount = combinations.filter((c) => c.enabled).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <App_Text variant="tableCell" className="font-semibold">
            Variant Combinations
          </App_Text>
          <App_Text variant="tableCellMuted">
            Set price, stock and SKU for each combination. Uncheck variants that
            don't exist.
          </App_Text>
        </div>
        <App_Text variant="tableCellMuted">
          {enabledCount} of {combinations.length} enabled
        </App_Text>
      </div>

      <div className="border border-[#ede8e2] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#ede8e2] bg-[#faf9f7]">
              <th className="py-3 px-3 text-left w-8">
                <input
                  type="checkbox"
                  checked={enabledCount === combinations.length}
                  onChange={(e) => toggleAll(e.target.checked)}
                  className="accent-primary w-4 h-4"
                />
              </th>
              <th className="py-3 px-3 text-left">
                <App_Text variant="tableHeader">Variant</App_Text>
              </th>
              <th className="py-3 px-3 text-left">
                <App_Text variant="tableHeader">Price (R)</App_Text>
              </th>
              <th className="py-3 px-3 text-left">
                <App_Text variant="tableHeader">Stock</App_Text>
              </th>
              <th className="py-3 px-3 text-left">
                <App_Text variant="tableHeader">SKU</App_Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combo) => (
              <tr
                key={combo.id}
                className={`border-b border-[#f5f2ee] last:border-0 transition-colors ${
                  !combo.enabled
                    ? "bg-[#faf9f7] opacity-50"
                    : "hover:bg-[#faf9f7]"
                }`}
              >
                {/* Enable/disable checkbox */}
                <td className="py-3 px-3">
                  <input
                    type="checkbox"
                    checked={combo.enabled}
                    onChange={(e) =>
                      updateCombo(combo.id, "enabled", e.target.checked)
                    }
                    className="accent-primary w-4 h-4"
                  />
                </td>

                {/* Variant label */}
                <td className="py-3 px-3">
                  <App_Text
                    variant="tableCell"
                    className={`font-medium ${!combo.enabled ? "text-muted-foreground" : ""}`}
                  >
                    {combo.label}
                  </App_Text>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {Object.entries(combo.attributes).map(([k, v]) => (
                      <span
                        key={k}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                      >
                        {k}: {v}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Price */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">R</span>
                    <input
                      type="number"
                      disabled={!combo.enabled}
                      value={combo.price || ""}
                      onChange={(e) =>
                        updateCombo(combo.id, "price", Number(e.target.value))
                      }
                      placeholder="0"
                      className="w-24 text-sm border border-gray-200 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-primary disabled:bg-[#f5f2ee] disabled:cursor-not-allowed"
                    />
                  </div>
                </td>

                {/* Stock */}
                <td className="py-3 px-3">
                  <input
                    type="number"
                    disabled={!combo.enabled}
                    value={combo.stock || ""}
                    onChange={(e) =>
                      updateCombo(combo.id, "stock", Number(e.target.value))
                    }
                    placeholder="0"
                    className="w-20 text-sm border border-gray-200 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-primary disabled:bg-[#f5f2ee] disabled:cursor-not-allowed"
                  />
                </td>

                {/* SKU */}
                <td className="py-3 px-3">
                  <input
                    type="text"
                    disabled={!combo.enabled}
                    value={combo.sku}
                    onChange={(e) =>
                      updateCombo(combo.id, "sku", e.target.value)
                    }
                    placeholder="e.g. SOF-S-OAK"
                    className="w-36 text-sm border border-gray-200 rounded-lg px-2.5 py-2 bg-white outline-none focus:border-primary disabled:bg-[#f5f2ee] disabled:cursor-not-allowed font-mono"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* From price preview */}
      {enabledCount > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <App_Text variant="tableCellMuted">
            Product listing will show:
          </App_Text>
          <App_Text variant="tableCell" className="font-semibold text-primary">
            From R
            {Math.min(
              ...combinations
                .filter((c) => c.enabled && c.price > 0)
                .map((c) => c.price),
            ).toLocaleString()}
          </App_Text>
        </div>
      )}
    </div>
  );
};

export default Variant_Combinations_Table;
