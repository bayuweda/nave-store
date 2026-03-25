import Sidebar from "@/components/admin/Sidebar";
// app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar tetap di sini */}
      <Sidebar />

      {/* Tambahkan Wrapper Main Content di bawah ini */}
      <main className="flex-1 transition-all duration-300 pl-20 lg:pl-0">
        {/* pl-20: Memberi ruang 80px di mobile (sesuai lebar w-20 sidebar mini)
           lg:pl-0: Di desktop, kalau Sidebar kamu 'relative', tidak butuh pl lagi. 
        */}
        {children}
      </main>
    </div>
  );
}
