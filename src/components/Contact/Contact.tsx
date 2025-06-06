import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { SocialBlock, SocialBlockMob } from "../SocialBlock/SocialBlock";
import { contactSchema } from "../../validation/contactSchema";
import { Input } from "../../shared/Input";
import { Textarea } from "../../shared/Textarea";
import { Title } from "../../shared/Title";
import { SubTitle } from "../../shared/SubTitle";
import { contactMeFormData } from "@/types";
import { sendMeContact } from "../../redux/contact/operations";
import { useAppDispatch } from "../../redux/store";
import {
  ContactContainer,
  ContactForm,
  ContactSection,
  InputGroup,
  InputWrapper,
  SocialWrapDTab,
  SocialWrapMob,
  SubmitButton,
  SuccessMessage,
  TextareaWrap,
} from "./Contact.styled";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm<contactMeFormData>({
    resolver: yupResolver(contactSchema(t)),
  });

  useEffect(() => {
    const errorFields = Object.keys(errors) as (keyof contactMeFormData)[];
    if (errorFields.length > 0) {
      trigger(errorFields);
    }
  }, [i18n.language, errors, trigger]);

  const onSubmit = async (data: contactMeFormData) => {
    try {
      await dispatch(sendMeContact(data)).unwrap();
      setSubmitted(true);
      reset();

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
    }
  };

  return (
    <ContactSection id="contact">
      <ContactContainer>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Title>{t("contact.title")}</Title>
          <SubTitle>{t("contact.subtitle")}</SubTitle>
        </motion.div>

        <ContactForm
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <InputWrapper>
            <InputGroup>
              <Input
                {...register("name")}
                label={t("contact.form.name")}
                width="100%"
                onClearError={() => clearErrors("name")}
                onValidate={() => trigger("name")}
                error={errors.name?.message}
              />
              <Input
                {...register("email")}
                label={t("contact.form.email")}
                type="email"
                width="100%"
                onClearError={() => clearErrors("email")}
                onValidate={() => trigger("email")}
                error={errors.email?.message}
              />
              <SocialWrapDTab>
                <SocialBlock />
              </SocialWrapDTab>
            </InputGroup>
            <TextareaWrap>
              <Textarea
                {...register("message")}
                label={t("contact.form.message")}
                onClearError={() => clearErrors("message")}
                onValidate={() => trigger("message")}
                error={errors.message?.message}
              />
              <SubmitButton type="submit">
                {t("contact.form.button")}
              </SubmitButton>
            </TextareaWrap>
          </InputWrapper>

          <AnimatePresence>
            {submitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: -200 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5 }}
              >
                {t("contact.form.success")}
              </SuccessMessage>
            )}
          </AnimatePresence>
        </ContactForm>
        <SocialWrapMob>
          <SocialBlockMob />
        </SocialWrapMob>
      </ContactContainer>
    </ContactSection>
  );
};
