import { Sidebar } from "./components/Sidebar";
import { ChatWindow } from "./components/ChatWindow";

export default function Home() {
  return (
    <main className="min-h-screen flex-row bg-[#010101] py-3 pr-3 flex items-top justify-top">
      <Sidebar />

      <ChatWindow />
    </main>
  )
}