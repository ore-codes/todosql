export default function Home() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 p-8 sm:p-12">
        <header className="w-full max-w-4xl flex justify-between items-center py-4 px-6 bg-white shadow-md rounded-md">
          <h1 className="text-xl font-bold text-gray-800">To-Do App</h1>
          <nav className="flex gap-4">
            <a
                href="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Login
            </a>
            <a
                href="/register"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              Register
            </a>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center gap-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Organize Your Tasks with Ease
          </h2>
          <p className="text-gray-600 text-lg max-w-xl">
            Manage your daily tasks effortlessly with our simple and intuitive To-Do app. Stay
            organized and productive every day.
          </p>
          <div className="flex gap-4">
            <a
                href="/login"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg"
            >
              Get Started
            </a>
            <a
                href="/register"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white text-lg"
            >
              Create Account
            </a>
          </div>
        </main>

        <footer className="w-full max-w-4xl py-4 text-center text-gray-500">
          © {new Date().getFullYear()} To-Do App. All Rights Reserved.
        </footer>
      </div>
  );
}
