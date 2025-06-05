import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SubTitle } from "../../shared/SubTitle";
import { Title } from "../../shared/Title";
import { selectProfile } from "../../redux/profile/selectors";
import { useViewportAmount } from "../../hooks/useViewportAmount";
import { Languages } from "../../App.type";
import {
  cardVariant,
  iconMap,
  itemVariant,
  listVariant,
} from "../../shared/Animations.const";
import {
  SkillsCard,
  Categories,
  CategoryTitle,
  SkillList,
  SkillsContainer,
  SkillsSections,
  SkillLink,
} from "./Skills.styled";

export const Skills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toLowerCase() as Languages;
  const profile = useSelector(selectProfile);
  const viewportAmount = useViewportAmount();

  return (
    <SkillsSections id="skills">
      <SkillsContainer>
        <Title>{t("skills.title")}</Title>
        <SubTitle>{t("skills.subtitle")}</SubTitle>

        <Categories>
          {profile?.skills?.map(({ _id: categoryId, category, items }) => {
            const categoryName =
              typeof category === "object" && category !== null
                ? category[lang]
                : category;

            return (
              <SkillsCard
                key={categoryId}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: viewportAmount }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px currentColor",
                }}
              >
                <CategoryTitle>{categoryName}</CategoryTitle>

                <SkillList
                  variants={listVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: viewportAmount }}
                >
                  {items.map(({ name, link, _id: skillId }) => {
                    const skillName = name?.[lang];
                    if (!skillName) return null;
                    const Icon = iconMap[skillName] ?? CheckCircle;

                    return (
                      <motion.li key={skillId} variants={itemVariant}>
                        <SkillLink
                          to={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon /> {skillName}
                        </SkillLink>
                      </motion.li>
                    );
                  })}
                </SkillList>
              </SkillsCard>
            );
          })}
        </Categories>
      </SkillsContainer>
    </SkillsSections>
  );
};
