import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/Loader";
import ChatWidget from "@/components/chatwidget/ChatWidget";
import RedesFlotantes from "@/components/RedesFlotantes";
import { Analytics } from "@vercel/analytics/next";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <LoadingProvider>
        <Loader />

        <main className="min-h-screen">
          {children}
          <ChatWidget />
          <Analytics />
        </main>

        <RedesFlotantes />
        <Footer />
      </LoadingProvider>
    </>
  );
}
