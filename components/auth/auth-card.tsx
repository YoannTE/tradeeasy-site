"use client";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-zinc-400">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
