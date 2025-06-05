import { useSelector } from "react-redux";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { selectProfile } from "../../redux/profile/selectors";
import { useViewportAmount } from "../../hooks/useViewportAmount";
import {
  containerVariants,
  containVariants,
  itemVariants,
} from "../../shared/Animations.const";
import {
  SocialLink,
  SocialLinks,
  SocialLinksContact,
} from "./SocialBlock.styled";

export const SocialContact = () => {
  const profile = useSelector(selectProfile);
  const viewportAmount = useViewportAmount();
  return (
    <SocialLinksContact
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: viewportAmount }}
    >
      <SocialLink
        href={profile?.telegram}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Send size={20} />
      </SocialLink>

      <SocialLink
        href={`mailto:${profile?.email}`}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Mail size={20} />
      </SocialLink>

      <SocialLink
        href={profile?.linkedin}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Linkedin size={20} />
      </SocialLink>

      <SocialLink
        href={profile?.gitHub}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Github size={20} />
      </SocialLink>
    </SocialLinksContact>
  );
};

export const SocialBlock = () => {
  const profile = useSelector(selectProfile);
  const viewportAmount = useViewportAmount();
  return (
    <SocialLinks
      variants={containVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: viewportAmount }}
    >
      <SocialLink
        href={profile?.telegram}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Send size={20} />
      </SocialLink>

      <SocialLink
        href={`mailto:${profile?.email}`}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Mail size={20} />
      </SocialLink>

      <SocialLink
        href={profile?.linkedin}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Linkedin size={20} />
      </SocialLink>

      <SocialLink
        href={profile?.gitHub}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Github size={20} />
      </SocialLink>

      <SocialLink
        href="https://www.google.com/maps/place/Запоріжжя"
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <MapPin size={20} />
      </SocialLink>
    </SocialLinks>
  );
};

export const SocialBlockMob = () => {
  const profile = useSelector(selectProfile);
  const viewportAmount = useViewportAmount();
  return (
    <SocialLinks
      variants={containVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: viewportAmount }}
    >
      <SocialLink
        href={profile?.gitHub}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Github size={20} />
      </SocialLink>
      <SocialLink
        href={profile?.telegram}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Send size={20} />
      </SocialLink>
      <SocialLink
        href={profile?.linkedin}
        target="_blank"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Linkedin size={20} />
      </SocialLink>
      <SocialLink
        href={`mailto:${profile?.email}`}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        <Mail size={20} />
      </SocialLink>
    </SocialLinks>
  );
};
