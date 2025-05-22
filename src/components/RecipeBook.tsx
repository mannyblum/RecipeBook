import { useState } from "react";
import TextField from "./forms/TextField";
import { useQuery } from "@tanstack/react-query";
import searchQueryOptions from "../queryOptions/searchQueryOptions";
import { CircleLoader } from "react-spinners";

const RecipeBook = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { isFetching, isSuccess, isError, data, error, refetch } = useQuery(
    searchQueryOptions()
  );

  const handleSearchSubmit = () => {
    refetch();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const renderRecipeList = () => {
    if (!isSuccess && !isFetching && !data) {
      return <>Start Search</>;
    }
    if (isSuccess && !isFetching && !data?.meals) {
      return <>No Results Found</>;
    }

    if (isSuccess && !isFetching && data.meals) {
      return <>Data Found</>;
    }
  };

  return (
    <div className="flex justify-center w-[75%] flex-col grow mx-auto">
      <div className="flex justify-center">
        <TextField
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          onKeyDown={handleSearchSubmit}
          placeholder="Search"
        />
      </div>
      <div className="overflow-y-auto">
        {isFetching ? <CircleLoader /> : renderRecipeList()}
      </div>
    </div>
  );
};

export default RecipeBook;
