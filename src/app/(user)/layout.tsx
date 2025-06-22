import { Layout } from "@/components/Layout/Layout";

export default function LayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
