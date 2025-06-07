import { Layout } from "@/components/Layout/Layout";
import { Providers } from "@/components/Providers/Providers";
import StyledComponentsRegistry from "@/lib/registry";

export default function LayoutBasic({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </StyledComponentsRegistry>
  );
}
