import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-6 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800">
          🔐 Welcome to Auth App
        </h1>
        <p className="text-gray-500">Simple & Secure Authentication System</p>

        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
