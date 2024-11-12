import "./globals.css"; // Import the global CSS file
import Link from "next/link"; // Import Next.js Link component

export const metadata = {
  title: "Parking Lot Management",
  description: "Log and manage parking lot entries and exits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* Add a navigation bar with a link to the homepage */}
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <Link href="/home">
              <span className="text-lg font-semibold hover:underline">
                Back to Home
              </span>
            </Link>
          </div>
        </header>

        {/* Render the page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
