import Layout from "@/components/templates/Layout";
import LoginPage from "./auth/login";
import Section from "@/components/atoms/Section";
import PaymentsPage from "./payments";

export default function Home() {
  return (
    <Section>
      <PaymentsPage />
    </Section>
  );
}
