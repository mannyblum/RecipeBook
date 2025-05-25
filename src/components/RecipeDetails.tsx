import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

import * as motion from "motion/react-client";
import { ChevronLeftIcon } from "@primer/octicons-react";

const RecipeDetails = () => {
  const {
    state: { meal },
  } = useLocation();

  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  const renderIngredientsWithMeasures = () => {
    const listItems: JSX.Element[] = [];

    // There are up to 20 ingredients/measures in TheMealDB API
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof typeof meal;
      const measureKey = `strMeasure${i}` as keyof typeof meal;

      const ingredient = meal[ingredientKey];
      const measure = meal[measureKey];

      // Only add if there's a valid ingredient (ignore empty or null)
      if (ingredient && ingredient.trim() !== "") {
        listItems.push(
          <li key={i} className="flex items-center justify-between">
            <p className="text-md text-black font-medium">
              {ingredient.trim()}
            </p>
            <p className="text-xs text-gray-500">{measure?.trim()}</p>
          </li>
        );
      }
    }

    return <ul className="w-full">{listItems}</ul>;
  };

  return (
    <div>
      <div className="m-4">
        <button
          className="font-bold uppercase mb-2 flex items-center py-1 px-2 bg-white text-sm border-2 rounded-sm border-black text-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-amber-500 active:shadow-none active:transform active:translate-[2px]"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon size={16} />
          Back
        </button>
        <h3 className="font-bold text-4xl">{meal.strMeal}</h3>
      </div>
      <div
        id="thumb"
        className="max-h-48 box-border p-0.5 max-w-fit mb-4 mx-4 rounded-lg border-2 border-black"
      >
        <img
          className="max-h-44 w-96 object-cover rounded-lg"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
      </div>
      <TabGroup onTabChange={setSelectedTab} />
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
          {meal.strInstructions}
        </div>
        <div
          id="tab_2_content"
          className={`${selectedTab === "ingredients" ? "block" : "hidden"}`}
        >
          <div className="flex">{renderIngredientsWithMeasures()}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

type TabGroupProps = {
  onTabChange: (selected: string) => void;
};

type PositionProps = {
  left: number;
  width: number;
  opacity: number;
};

// TODO: move to own component file
const TabGroup = ({ onTabChange }: TabGroupProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  const [position, setPosition] = useState<PositionProps>({
    left: 4,
    width: 100,
    opacity: 1,
  });

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTab]);

  return (
    <ul
      id="tabs"
      className="relative mx-4 p-1 rounded-md border-2 bg-white flex flex-1/2 gap-4"
    >
      <Tab
        position={position}
        selectedTab={selectedTab}
        setPosition={setPosition}
        setSelectedTab={setSelectedTab}
        name="instructions"
      >
        Instructions
      </Tab>
      <Tab
        position={position}
        selectedTab={selectedTab}
        setPosition={setPosition}
        setSelectedTab={setSelectedTab}
        name="ingredients"
      >
        Ingredients
      </Tab>

      <Selector position={position} />
    </ul>
  );
};

type TabProps = {
  children: ReactNode;
  position: PositionProps;
  selectedTab: string;
  setPosition: (position: PositionProps) => void;
  setSelectedTab: (name: string) => void;
  name: string;
};

const Tab = ({
  children,
  position,
  setPosition,
  selectedTab,
  setSelectedTab,
  name,
}: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    setPosition({
      ...position,
      width: ref.current.offsetLeft,
    });
  }, []);

  return (
    <li
      ref={ref}
      id={`tab-${children}`}
      className={`relative cursor-pointer w-1/2 text-center`}
      onClick={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setSelectedTab(name);
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
    >
      <p
        className={`relative uppercase py-1 text-sm z-10 text-center block text-black ${
          ref.current?.textContent?.toLowerCase() === selectedTab.toLowerCase()
            ? "font-bold"
            : ""
        }`}
      >
        {children}
      </p>
    </li>
  );
};

type SelectorProps = {
  position: PositionProps;
};

const Selector = ({ position }: SelectorProps) => {
  return (
    <motion.li
      animate={position}
      className="z-0 absolute bg-teal-500 h-7 rounded-sm"
    />
  );
};
