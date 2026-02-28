import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/Loader";
import ChatWidget from "@/components/chatwidget/ChatWidget";
import RedesFlotantes from "@/components/RedesFlotantes";
import { Analytics } from "@vercel/analytics/next";
import ScrollProgressBar from "@/components/scroolprogress/ScrollProgressBar";
import OnlineVisitors from "@/components/onlinevisitors/OnlineVisitors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu Marca",
  description: "Tu Marca",
  
  openGraph: {
    title: "Tu Marca",
    description: "Tu Marca",
    url: "https://tumarca.com",
    siteName: "Tu Marca",
    images: [
      {
        url: "https://tumarca.com/logo-n.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Marca",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Marca",
    description: "Tu Marca",
    images: ["https://tumarca.com/logo-n.jpg"],
  },
};


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
  <ScrollProgressBar 
        gradient="from-pink-500 to-rose-500"
        opacity={0.9}
        className="shadow-lg shadow-pink-500/20"

      />
      <LoadingProvider>
        <Loader />

        <main className="min-h-screen">
       
          {children}
           <OnlineVisitors />
          <ChatWidget />
          <Analytics />
        </main>

        <RedesFlotantes />
        <Footer />
      </LoadingProvider>
    </>
  );
}
