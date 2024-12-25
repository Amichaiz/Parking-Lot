import Link from "next/link";
import Rates from "@/app/components/Rates";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center  min-h-96">
      <h1 className="text-4xl font-bold mb-10">
        Parking Lot <Link href="/manager">Management</Link>{" "}
      </h1>

      {/* Flex container for Entering and Leaving buttons */}
      <div className="flex space-x-4">
        <Link href="/entering">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Entering
          </button>
        </Link>
        <Link href="/leaving">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Leaving
          </button>
        </Link>
      </div>

      {/* Absolute positioned Register button at the bottom */}
      <div className="flex space-x-4 pt-10 pr-4">
        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
        <Rates />
      </div>
    </div>
  );
}
