"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Settings_Mobile_Nav from "../store_information_view/store_information_components/Settings_Mobile_Nav";
import Settings_Sidebar_Nav from "../store_information_view/store_information_components/Settings_Sidebar_Nav";
import Add_Payment_Method_Modal from "./payment_modals/Add_Payment_Method_Modal";
import Payment_Method_Row from "./payments_components/Payment_Method_Row";
import { usePaymentMethods } from "./payments_hooks/usePaymentQueries";
import App_Loader from "@/components/app_ui/App_Loader";

const Payment_View = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { data: methods, isLoading } = usePaymentMethods();

  const activeCount = methods?.filter((m) => m.status).length ?? 0;

  return (
    <div className="">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/settings">
            <App_Text
              variant="tableCellMuted"
              className="hover:text-primary cursor-pointer"
            >
              Settings
            </App_Text>
          </Link>
          <ChevronRight size={13} className="text-muted-foreground" />
          <App_Text variant="tableCellMuted" className="text-[text]">
            Payment Methods
          </App_Text>
        </div>

        <Settings_Mobile_Nav />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <App_Text variant="pageTitle">Payment Methods</App_Text>
            <App_Text variant="pageSub">
              Manage payment gateways and settings.
            </App_Text>
          </div>
          <App_Button
            text="Add Payment Method"
            icon={<Plus size={13} />}
            type="button"
            onPress={() => setShowAdd(true)}
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
          />
        </div>

        {isLoading || !methods ? (
          <App_Loader label="Loading payment methods..." />
        ) : (
          <>
            <div className="flex items-center gap-2">
              <App_Text variant="tableCellMuted">
                {activeCount} of {methods.length} payment methods active
              </App_Text>
            </div>

            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 space-y-2">
              {methods.map((method) => (
                <Payment_Method_Row key={method.id} method={method} />
              ))}
            </div>

            {activeCount === 0 && (
              <div className="bg-[#fdf5e0] border border-[#f5e0a0] rounded-xl px-4 py-3">
                <App_Text variant="tableCellMuted" className="text-[#8a6300]">
                  Warning: No payment methods are active. Customers won't be
                  able to complete checkout.
                </App_Text>
              </div>
            )}
          </>
        )}
      </div>

      {showAdd && (
        <Add_Payment_Method_Modal onClose={() => setShowAdd(false)} />
      )}
    </div>
  );
};

export default Payment_View;
