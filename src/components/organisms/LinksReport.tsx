"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { UrlData } from "./UrlTable";

interface TopUrlChartData {
  shortUrlId: string;
  accessCount: number;
}

const LinksReport: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topUrlsChartData, setTopUrlsChartData] = useState<TopUrlChartData[]>(
    []
  );

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await fetch("http://localhost:3001/shortener");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        processChartData(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlData();
  }, []);

  const processChartData = (urlData: UrlData[]) => {
    const sortedUrls = [...urlData].sort(
      (a, b) => b.numberOfAccesses - a.numberOfAccesses
    );

    const topNUrls: TopUrlChartData[] = sortedUrls.slice(0, 5).map((item) => ({
      shortUrlId: item.shortUrl.split("/").pop() || item.shortUrl,
      accessCount: item.numberOfAccesses,
    }));
    setTopUrlsChartData(topNUrls);
  };

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
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Painel de URLs Encurtadas
      </h2>

      <div className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          URLs Mais Acessadas (Top 5)
        </h3>
        {topUrlsChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topUrlsChartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="shortUrlId" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value: number) => [`Acessos: ${value}`]}
                labelFormatter={(label: string) => `URL ID: ${label}`}
                wrapperClassName="rounded-md shadow-lg p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <Legend />
              <Bar
                dataKey="accessCount"
                fill="#8884d8"
                name="Total de Acessos"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Nenhum dado de acesso para gerar o gráfico.
          </p>
        )}
      </div>
    </div>
  );
};

export default LinksReport;
