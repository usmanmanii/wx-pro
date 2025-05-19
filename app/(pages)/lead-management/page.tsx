"use client";

import React, { Suspense } from "react";
import LeadsPage from "./LeadsPage";


export default function LeadManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadsPage />
    </Suspense>
  );
}
