// 'use client'

import { Providers } from "../Themeproviders";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div>{children}</div>
    </Providers>
  );
};
export default RootLayout;
