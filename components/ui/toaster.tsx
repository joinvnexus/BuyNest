"use client";

import {
  useToast,
  Toaster as SonnerToaster,
} from "react-hot-toast";

const Toaster = ({ ...props }) => {
  const { toasts } = useToast();

  return (
    <SonnerToaster
      toastOptions={{
        className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg [&_.group]:bg-background [&_.group]:text-foreground",
        style: {
          top: "4rem",
        },
      }}
    />
  );
};

export { Toaster };

