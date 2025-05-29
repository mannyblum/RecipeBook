import { isEmpty } from "lodash";
import RecipeBook from "./components/RecipeBook";
import RecipeDetails from "./components/RecipeDetails";
import { useMeal } from "./context/RecipeBookContext";
import { ChevronLeftIcon } from "@primer/octicons-react";
import type { Meal } from "./queryOptions/searchQueryOptions";

const Home = () => {
  const { meal, setMeal } = useMeal();

  const renderComponent = () => {
    if (isEmpty(meal)) {
      return <RecipeBook />;
    } else {
      return <RecipeDetails />;
    }
  };

  return (
    <div className="bg-amber-50 h-screen py-2 pb-4 ">
      <header className="mx-4 mb-2 flex flex-row items-center justify-between">
        {!isEmpty(meal) && (
          <button
            className="font-bold uppercased flex items-center py-1 px-1 bg-white text-sm border-2 rounded-sm border-black text-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-amber-500 active:shadow-none active:transform active:translate-[2px]"
            onClick={() => setMeal({} as Meal)}
          >
            <ChevronLeftIcon size={16} />
          </button>
        )}
        <h1 className="antonio mx-auto text-center">RecipeBook</h1>
      </header>
      {renderComponent()}
    </div>
  );
};

export default Home;
