"use client";
import { useState } from "react";

interface ShortenerFormProps {
  onUrlShortened?: (shortUrl: string) => void;
}

const ShortenerForm: React.FC<ShortenerFormProps> = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShortenedUrl(null);

    try {
      console.log("Original URL:", originalUrl);
      const response = await fetch("http://localhost:3001/shortener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Erro ao encurtar URL: ${response.statusText}`
        );
      }

      const data = await response.json();
      const generatedShortUrl = `http://localhost:3001/shortener/${data.shortUrl}`;
      setShortenedUrl(generatedShortUrl);
      setOriginalUrl("");

      if (onUrlShortened) {
        onUrlShortened(generatedShortUrl);
      }
    } catch (err: any) {
      console.error("Erro ao encurtar URL:", err);
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Encurtar Link
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="originalUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL Original:
          </label>
          <input
            type="url"
            id="originalUrl"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex: https://www.meusite.com/link-longo"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !originalUrl.trim()}
        >
          {loading ? "Encurtando..." : "Encurtar Link"}
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-center">
          <p className="text-green-800 text-sm font-semibold mb-2">
            Seu link encurtado:
          </p>
          <div className="flex gap-2 align-middle justify-center">
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium break-all hover:underline"
            >
              {shortenedUrl}
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Copiar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-center">
          <p className="text-red-800 text-sm font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
