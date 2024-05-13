"use client";

import SideNav from "@/components/SideNav";

export default function Layout(
    { children }: 
    { readonly children: React.ReactNode }
) {
  return (
    <div className="h-screen">
      <SideNav />
      
      <div className="">{children}</div>
    </div>
  );
}