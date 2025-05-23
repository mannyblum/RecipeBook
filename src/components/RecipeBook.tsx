import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import { isEqual } from "lodash";

import TextField from "./forms/TextField";

import searchQueryOptions, {
  type Meal,
} from "../queryOptions/searchQueryOptions";
import { DotFillIcon } from "@primer/octicons-react";
import { Link } from "react-router";

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
              <Link
                to={`details/${meal.idMeal}`}
                className="text-black!"
                state={{ meal: meal }}
              >
                <div className="bg-white rounded-bl-sm border-2 mb-2 border-black py-4 px-2 grid grid-cols-6 place-content-start">
                  <div className="col-span-1">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="col-span-5 pl-2 flex flex-col -mt-2  place-content-start">
                    <div className="flex flex-row items-center mb-2 justify-between">
                      <h2 className="text-md font-bold">{meal.strMeal}</h2>
                      <span className="text-xs flex items-center justify-start">
                        <DotFillIcon fill="green" size={12} />
                        {meal.strCategory}
                      </span>
                    </div>
                    <div className="flex flex-row flex-wrap">
                      {/* <span className="py-0.5 px-2 text-xs font-bold border-2 rounded-sm bg-blue-600 mr-2 ">
                      {meal.strCategory}
                    </span> */}
                      <span className="mr-2 mb-2 py-0.5 px-2 text-xs font-bold border-2 rounded-sm bg-amber-600 ">
                        {meal.strArea}
                      </span>
                      {meal?.strTags?.split(",").map((tag) => {
                        return (
                          <span className="mr-2 mb-2 py-0.5 px-2 text-xs font-bold border-2 rounded-sm bg-indigo-400">
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
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
    if (inputValue.length === 0) return;

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
