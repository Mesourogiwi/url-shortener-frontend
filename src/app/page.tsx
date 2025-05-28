import Link from "next/link";
import { Toaster } from "sonner";
import ShortenerForm from "../components/organisms/ShortenerForm";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <Toaster richColors position="top-center" />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Encurtador de URL
      </h1>

      <div className="mb-10">
        <ShortenerForm />
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/links" className="inline-flex">
          <button className="inline-flex max-w-md w-full mx-auto justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-lime-600 hover:bg-lime-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600">
            Ver links gerados
          </button>
        </Link>
        <Link href="/reports" className="inline-flex">
          <button className="inline-flex max-w-md w-full mx-auto justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            Ver realtórios
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
