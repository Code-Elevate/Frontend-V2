import { ThemeProvider } from "@/utils/providers/theme";
import { Suspense } from "react";

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
