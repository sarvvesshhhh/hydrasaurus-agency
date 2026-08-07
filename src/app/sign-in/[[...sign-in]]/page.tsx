import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070709] px-4 py-16 text-white relative z-20">
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight">HYDRASAURUS AGENCY</h1>
        <p className="text-xs text-gray-400 font-mono">AUTHENTICATION PORTAL</p>
      </div>
      <SignIn 
        appearance={{
          elements: {
            card: "bg-[#0B0B0E] border border-white/10 shadow-2xl text-white rounded-xl",
            headerTitle: "text-white font-bold",
            headerSubtitle: "text-gray-400",
            formButtonPrimary: "bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-600/20",
            socialButtonsBlockButton: "border-white/10 text-white hover:bg-white/5",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-black/50 border-white/10 text-white focus:border-red-500",
            footerActionLink: "text-red-400 hover:text-red-300 font-semibold"
          }
        }}
      />
    </div>
  );
}
