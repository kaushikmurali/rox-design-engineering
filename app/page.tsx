import { Sidebar } from "./components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen flex-row bg-[#010101] py-3 pr-3 flex items-top justify-top">
      <Sidebar />

      <div className="w-full bg-[#0F0F0F] space-y-2 px-6 pt-6 rounded-xl">
      </div>
    </main>
  )
}