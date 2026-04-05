"use client";

import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = ({ ...props }) => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg [&_.group]:bg-background [&_.group]:text-foreground",
        style: {
          top: "4rem",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

