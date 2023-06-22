"use client";

import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
};

export default Providers;
