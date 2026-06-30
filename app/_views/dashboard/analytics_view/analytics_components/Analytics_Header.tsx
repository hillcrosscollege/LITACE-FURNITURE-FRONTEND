"use client";

import { useState } from "react";
import { Calendar, Upload, ChevronDown, Filter } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { DateRangeValue } from "../overview_view/overview_data/overview_data";

type Props = {
  breadcrumbs: string[];
  title: string;
  subtitle: string;
  dateRange: DateRangeValue;
  onDateChange: (range: DateRangeValue) => void;
  reportType: string;
  exportOptions: { id: string; label: string }[];
  onExport: (format: string, includes: string[]) => void;
  isExporting?: boolean;
  onFiltersClick?: () => void; // NEW
};

const Analytics_Header = ({
  breadcrumbs,
  title,
  subtitle,
  dateRange,
  onDateChange,
  reportType,
  exportOptions,
  onExport,
  isExporting,
  onFiltersClick,
}: Props) => {
  const [showDateRange, setShowDateRange] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-1.5">
              <App_Text
                variant="tableCellMuted"
                className={i === breadcrumbs.length - 1 ? "text-[#1e1a17]" : ""}
              >
                {crumb}
              </App_Text>
              {i < breadcrumbs.length - 1 && (
                <span className="text-muted-foreground text-xs">›</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">{title}</App_Text>
            <App_Text variant="pageSub">{subtitle}</App_Text>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowDateRange(true)}
              className="flex items-center gap-2 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 transition-colors"
            >
              <Calendar size={13} />
              {dateRange.label}
              <ChevronDown size={13} />
            </button>
            {onFiltersClick && (
              <App_Button
                text="Filters"
                icon={<Filter size={13} />}
                type="button"
                onPress={onFiltersClick}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
              />
            )}
            <App_Button
              text="Export"
              icon={<Upload size={13} />}
              type="button"
              onPress={() => setShowExport(true)}
              btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
            />
          </div>
        </div>
      </div>

      {/* {showDateRange && (
        <Date_Range_Modal
          current={dateRange}
          onClose={() => setShowDateRange(false)}
          onApply={onDateChange}
        />
      )}
      {showExport && (
        <Export_Report_Modal
          reportType={reportType}
          includeOptions={exportOptions}
          onClose={() => setShowExport(false)}
          onExport={(format, includes) => {
            onExport(format, includes);
            setShowExport(false);
          }}
          isPending={isExporting}
        />
      )} */}
    </>
  );
};

export default Analytics_Header;
