import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import { Projects } from "@/components/Projects/Projects";
import { Skills } from "@/components/Skills/Skills";

const HomePage = () => {
  return (
    <>
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default HomePage;
