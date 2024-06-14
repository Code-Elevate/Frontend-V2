import { Suspense } from "react";

import { ThemeProvider } from "@/utils/providers/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback="Loading...">{children}</Suspense>
    </ThemeProvider>
  );
}
