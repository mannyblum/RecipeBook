import { useState } from "react";
import { useLocation } from "react-router";

const RecipeDetails = () => {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  return (
    <div>
      <div className="m-4">
        <h3 className="font-bold text-4xl">{location.state.meal.strMeal}</h3>
      </div>
      <div
        id="thumb"
        className="max-h-48 box-border p-0.5 max-w-fit mb-4 mx-4 rounded-lg border-2 border-black"
      >
        <img
          className="max-h-24 w-96 object-cover rounded-lg"
          src={location.state.meal.strMealThumb}
          alt={location.state.meal.strMeal}
        />
      </div>
      <div
        id="tabs"
        className="mx-4 p-1 rounded-md border-2 bg-white flex flex-1/2 gap-4"
      >
        <div
          id="tab_1"
          className={`cursor-pointer w-1/2 text-center ${
            selectedTab === "instructions"
              ? "bg-teal-400 text-black font-black rounded-md border-2 border-black"
              : ""
          }`}
          onClick={() => setSelectedTab("instructions")}
        >
          <p className="py-1 text-sm flex justify-center items-center">
            Instructions
          </p>
        </div>
        <div
          id="tab_2"
          className={`cursor-pointer w-1/2 text-center ${
            selectedTab === "ingredients"
              ? "bg-teal-400 text-black font-black rounded-md border-2 border-black"
              : ""
          }`}
          onClick={() => setSelectedTab("ingredients")}
        >
          <p className="py-1 text-sm flex justify-center items-center">
            Ingredients
          </p>
        </div>
      </div>
      <div
        id="tabs-content"
        className="m-4 px-3 py-4 rounded-md text-md bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        <div
          id="tab_1_content"
          className={`whitespace-pre-line ${
            selectedTab === "instructions" ? "block" : "hidden"
          }`}
        >
          {location.state.meal.strInstructions}
        </div>
        <div
          id="tab_2_content"
          className={`${selectedTab === "ingredients" ? "block" : "hidden"}`}
        >
          content 2
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
