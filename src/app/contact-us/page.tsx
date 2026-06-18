import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Track Opinion",
  description:
    "Get in touch with the Track Opinion team. We'd love to hear from you and help with your market research needs.",
  alternates: { canonical: "https://www.trackopinion.com/contact-us" },
};

export default function ContactUs() {
  return <ContactPage />;
}
