import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "./providers";
import { Layout } from "@/components/Layout/Layout";

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
    icon: "/favicon.webp",
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
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
