import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/components/Providers/Providers";

export const metadata = {
  title: "Fullstack Developer Portfolio | Your Name",
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
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
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
