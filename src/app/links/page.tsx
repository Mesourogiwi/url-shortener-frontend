import LinksReport from "../../components/organisms/LinksReport";
import UrlTable from "../../components/organisms/UrlTable";

const LinksPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        Links gerados
      </h1>
      <UrlTable />
      <LinksReport />
    </div>
  );
};

export default LinksPage;
