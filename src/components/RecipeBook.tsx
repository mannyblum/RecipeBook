import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import TextField from "./forms/TextField";

import searchQueryOptions from "../queryOptions/searchQueryOptions";
import { useSearchParams } from "react-router";
import RecipeList from "./RecipeList";

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

const RecipeBook = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { isFetching, isSuccess, isError, data, error, refetch } = useQuery(
    searchQueryOptions(searchTerm)
  );

  const term = searchParams.get("term") || "";

  useEffect(() => {
    if (!data) {
      setSearchTerm(term);
      refetch();
    }

    if (term.length > 0) {
      setInputValue(term);
    }
  }, [term]);

  const handleSearchSubmit = async () => {
    if (inputValue.length === 0) return;

    setSearchTerm(inputValue);
    setSearchParams({ term: inputValue });
    // timeout(500);
    await refetch();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("isSuccess", isSuccess);
  console.log("isFetching", isFetching);
  console.log("data", data);

  const renderRecipeList = () => {
    if (isSuccess && !isFetching && !data) {
      return (
        <div className="mx-8 mt-4 bg-white border-2 mb-2 border-black py-4 px-2 rounded-md">
          Start Search
        </div>
      );
    }

    if (isSuccess && !isFetching && !data?.meals) {
      return (
        <div className="mx-8 mt-4 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md bg-white border-2 mb-2 border-black py-4 px-2">
          No Results Found
        </div>
      );
    }

    if (isSuccess && !isFetching && data?.meals) {
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
