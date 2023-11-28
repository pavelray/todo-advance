import Login from "@/components/Business/Login";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getCurrentUser(); 
  if(session){
    redirect('/dashboard');
  }
  return (
    <main className="flex min-h-screen items-center flex-col justify-center content-center">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-screen">
        <Login />
      </div>
    </main>
  );
}
