import styled from "styled-components";

export const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 400px;
`;
export const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1.3s ease;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};

  @media (hover: hover) and (pointer: fine) {
    ${CardWrapper}:hover & {
      transform: rotateY(180deg);
    }
  }
`;
export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgPrimary};
  border: 1px solid ${({ theme }) => theme.textPrimary};

  @media (min-width: 768px) {
    padding: 20px;
  }
`;
export const FrontFace = styled(CardFace)`
  box-shadow: 0 0 8px ${({ theme }) => theme.textPrimary};
`;
export const BackFace = styled(CardFace)`
  box-shadow: 0 0 20px ${({ theme }) => theme.textPrimary};
  transform: rotateY(180deg);
  justify-content: space-between;
`;
export const ProjectImg = styled.img`
  height: 240px;
  border-radius: 12px;
  flex-shrink: 0;
`;
export const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
  padding-bottom: 6px;
  border-bottom: 2px solid ${({ theme }) => theme.svg};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const TechTag = styled.span`
  color: ${({ theme }) => theme.textPrimary};
`;
export const ProjectTechnologies = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ProjectDescription = styled.p`
  width: 100%;
  height: 236px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;

  @media (min-width: 768px) {
    -webkit-line-clamp: 10;
  }

  @media (min-width: 1280px) {
    -webkit-line-clamp: 8;
  }
`;
export const ProjectRole = styled.p`
  margin-bottom: 8px;
  margin-left: 8px;

  span {
    margin-left: 8px;
  }
`;
export const ProjectDate = styled.p`
  text-align: center;
  font-size: 14px;
`;
export const WrapLinkProject = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LinkProject = styled.a`
  width: 140px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textPrimary};
  border: 2px solid ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgSecondary};

  svg {
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.svg};
  }

  &:hover,
  &:active {
    box-shadow: 0 0 20px ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.bgSecondary};
  }
`;
