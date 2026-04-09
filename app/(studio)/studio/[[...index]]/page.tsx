import { notFound } from "next/navigation";

const isStudioEnabled = process.env.ENABLE_STUDIO === "true";

export default async function StudioPage() {
  if (!isStudioEnabled) {
    notFound();
  }

  const StudioPageClient = (await import("./StudioPageClient")).default;
  return <StudioPageClient />;
}
