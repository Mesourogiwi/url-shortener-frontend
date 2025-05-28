"use client";

import { useEffect, useState } from "react";

export interface UrlData {
  id: string;
  url: string;
  shortUrl: string;
  expirationTime: string;
  numberOfAccesses: number;
}

const UrlTable: React.FC = () => {
  const [data, setData] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await fetch("http://localhost:3001/shortener");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: UrlData[] = await response.json();
        setData(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-700 dark:text-gray-300">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-600 dark:text-red-400">
          Erro ao carregar os dados: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Minhas URLs Encurtadas
      </h2>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                URL Original
              </th>
              <th scope="col" className="py-3 px-6">
                URL Encurtada
              </th>
              <th scope="col" className="py-3 px-6">
                Expiração
              </th>
              <th scope="col" className="py-3 px-6">
                Número de acessos
              </th>
              {/* Adicione uma coluna para ações se desejar */}
              {/* <th scope="col" className="py-3 px-6">
                Ações
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 break-words max-w-xs md:max-w-md lg:max-w-lg">
                    {item.url}
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={`http://localhost:3001/shortener/${item.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {`http://localhost:3001/shortener/${item.shortUrl}`}
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    {new Date(item.expirationTime).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">{item.numberOfAccesses}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhum dado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlTable;
