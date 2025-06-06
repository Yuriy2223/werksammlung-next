"use client";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ModalUniversal } from "../../modals/UniversalModal/UniversalModal";
import { useTrackStats } from "@/hooks/useTrackStats";
import {
  LayoutWrapper,
  HeaderWrapper,
  MainWrapper,
  FooterWrapper,
} from "./Layout.styled";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useTrackStats();

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      <ModalUniversal />
    </LayoutWrapper>
  );
};
