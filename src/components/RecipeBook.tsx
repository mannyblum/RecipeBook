import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import { isEqual } from "lodash";

import TextField from "./forms/TextField";

import searchQueryOptions, {
  type Meal,
} from "../queryOptions/searchQueryOptions";

type RecipeListProps = {
  meals: Meal[];
};

const RecipeList: React.FC<RecipeListProps> = React.memo(
  ({ meals }) => {
    console.log("list");
    return (
      <ul className="mx-8 mt-4">
        {meals.map((meal) => {
          return (
            <li key={meal.idMeal}>
              <div className="bg-white border-2 mb-2 border-black py-4 px-2 grid grid-cols-4 place-content-start">
                <div className="col-span-1">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10"
                  />
                </div>
                <div className="col-span-3">{meal.strMeal}</div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps.meals, nextProps.meals)
);

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

const RecipeBook = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const { isFetching, isSuccess, isError, data, error, refetch } = useQuery(
    searchQueryOptions(searchTerm)
  );

  const handleSearchSubmit = async () => {
    setSearchTerm(inputValue);
    // timeout(500);
    await refetch();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log("isSuccess", isSuccess);
  // console.log("isFetching", isFetching);
  // console.log("data", data);

  const renderRecipeList = () => {
    if (!isSuccess && !isFetching && !data) {
      return (
        <div className="mx-8 mt-4 bg-white border-2 mb-2 border-black py-4 px-2">
          Start Search
        </div>
      );
    }

    if (isSuccess && !isFetching && !data?.meals) {
      return (
        <div className="mx-8 mt-4 bg-white border-2 mb-2 border-black py-4 px-2">
          No Results Found
        </div>
      );
    }

    if (isSuccess && !isFetching && data.meals) {
      return <RecipeList meals={data.meals} />;
    }
  };

  return (
    <div className="flex justify-center w-full md:w-[75%] flex-col grow mx-auto">
      <div className="flex justify-center">
        <TextField
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          onKeyDown={handleSearchSubmit}
          placeholder="Search"
        />
      </div>
      <div className="overflow-y-auto">
        {isFetching ? (
          <div className="mx-8 mt-4  mb-2  py-4 px-2 text-center">
            <ClipLoader speedMultiplier={0.6} />
          </div>
        ) : (
          renderRecipeList()
        )}
      </div>
    </div>
  );
};

export default RecipeBook;
