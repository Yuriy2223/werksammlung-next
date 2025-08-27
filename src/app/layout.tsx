import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/components/Providers/Providers";

export const metadata = {
  title: "Portfolio Yuriy Shukan",
  description:
    "Portfolio of a fullstack developer specializing in modern web applications with React, Next.js, Node.js, and TypeScript.",
  authors: [{ name: "Yuriy Shukan" }],
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
