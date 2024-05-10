"use client";

import SideNav from "@/components/SideNav";

export default function Layout(
    { children }: 
    { readonly children: React.ReactNode }
) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="">
        <SideNav />
      </div>
      <div className="">{children}</div>
    </div>
  );
}