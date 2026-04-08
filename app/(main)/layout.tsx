import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WebsitePreloader } from "@/components/layout/WebsitePreloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebsitePreloader />
      <CustomCursor />
      <SmoothScroller>{children}</SmoothScroller>
    </>
  );
}
