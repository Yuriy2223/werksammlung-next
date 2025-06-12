import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/components/Providers/Providers";

export const metadata = {
  title: "Fullstack Developer Portfolio | Yuriy Shukan",
  description:
    "Portfolio of a fullstack developer specializing in modern web applications with React, Next.js, Node.js, and TypeScript.",
  keywords: [
    "fullstack developer",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "web development",
    "frontend",
    "backend",
    "software engineer",
  ],
  authors: [{ name: "Yuriy Shukan" }],
  creator: "Yuriy Shukan",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
