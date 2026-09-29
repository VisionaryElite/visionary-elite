import type { Metadata } from "next";
import TrackingCapture from "@/components/TrackingCapture";
import ApplicationForm from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Aplicación | Visionary Elite",
  robots: { index: false },
};

export default function ApplyPage() {
  return (
    <>
      <TrackingCapture />
      <ApplicationForm />
    </>
  );
}
