
import ChatWidget from "@/components/chatwidget/ChatWidget";



export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-white">
        {children}
        <ChatWidget />
      </main>
    </>
  );
}
