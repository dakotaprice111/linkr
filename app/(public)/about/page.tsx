import type { Metadata } from "next";
import { AboutContent } from "@/components/landing/AboutContent";

export const metadata: Metadata = {
  title: "About — DropLink",
  description: "We're building the creator economy of tomorrow.",
};

export default function AboutPage() {
  return <AboutContent />;
}
