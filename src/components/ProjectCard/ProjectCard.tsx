import React, { useEffect, useRef, useState } from "react";
import { Github, Globe } from "lucide-react";
import { Language, Project } from "@/types";
// import { Languages, Project } from "../../App.type";
import {
  BackFace,
  CardWrapper,
  CardInner,
  FrontFace,
  ProjectDescription,
  ProjectImg,
  ProjectRole,
  ProjectTechnologies,
  ProjectTitle,
  TechTag,
  ProjectDate,
  LinkProject,
  WrapLinkProject,
} from "./ProjectCard.styled";

interface ProjectCardProps {
  project: Project;
  lang: Language;
}

const isTouchDevice = () => {
  return navigator.maxTouchPoints > 0;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, lang }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // const handleClick = () => {
  //   if (window.matchMedia("(hover: none)").matches) {
  //     setIsFlipped((prev) => !prev);
  //   }
  // };

  const handleClick = () => {
    if (isTouchDevice()) {
      setIsFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isFlipped &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setIsFlipped(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isFlipped]);

  return (
    <CardWrapper onClick={handleClick} ref={cardRef}>
      <CardInner $isFlipped={isFlipped}>
        <FrontFace>
          <ProjectImg src={project.imgUrl} alt={project.title[lang]} />
          <ProjectTitle>{project.title[lang]}</ProjectTitle>
          <ProjectTechnologies>
            {project.technologies.map((tech: string, i: number) => (
              <React.Fragment key={i}>
                <TechTag>{tech}</TechTag>
                {i < project.technologies.length - 1 && <span>,&nbsp;</span>}
              </React.Fragment>
            ))}
          </ProjectTechnologies>
        </FrontFace>
        <BackFace>
          <div>
            <ProjectDescription>{project.description[lang]}</ProjectDescription>
          </div>
          <WrapLinkProject>
            <LinkProject
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
              <Github size={20} />
            </LinkProject>
            <LinkProject
              href={project.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Web Site"
            >
              Website
              <Globe size={20} />
            </LinkProject>
          </WrapLinkProject>
          <div>
            <ProjectRole>
              Role:<span>{project.role[lang]}</span>
            </ProjectRole>
            <ProjectDate>{project.date}</ProjectDate>
          </div>
        </BackFace>
      </CardInner>
    </CardWrapper>
  );
};
