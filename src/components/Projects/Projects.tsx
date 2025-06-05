import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Languages, Project } from "../../App.type";
import { Title } from "../../shared/Title";
import { SubTitle } from "../../shared/SubTitle";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { selectProfile } from "../../redux/profile/selectors";
import { useViewportAmount } from "../../hooks/useViewportAmount";
import { itemVariants } from "../../shared/Animations.const";
import {
  ProjectItem,
  ProjectsContainer,
  ProjectsList,
  ProjectsSection,
} from "./Projects.styled";

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toLowerCase() as Languages;
  const profile = useSelector(selectProfile);
  const projects = profile?.projects || [];
  const viewportAmount = useViewportAmount();

  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <Title>{t("projects.title")}</Title>
        <SubTitle>{t("projects.subtitle")}</SubTitle>
        <ProjectsList>
          {projects.map((project: Project) => (
            <ProjectItem
              key={project._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: viewportAmount }}
              variants={itemVariants}
            >
              <ProjectCard project={project} lang={lang} />
            </ProjectItem>
          ))}
        </ProjectsList>
      </ProjectsContainer>
    </ProjectsSection>
  );
};
