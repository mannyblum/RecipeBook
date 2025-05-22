import { useState } from "react";
import TextField from "./forms/TextField";

const RecipeBook = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchSubmit = () => {
    // run search here
    console.log("search");
  };

  return (
    <div className="flex justify-center">
      <TextField
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        onKeyDown={handleSearchSubmit}
        placeholder="Search"
      />
    </div>
  );
};

export default RecipeBook;
