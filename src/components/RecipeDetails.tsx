import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router";

import * as motion from "motion/react-client";

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

type TabGroupProps = {
  onTabChange: (selected: string) => void;
};

type PositionProps = {
  left: number;
  width: number;
  opacity: number;
};

const TabGroup = ({ onTabChange }: TabGroupProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  const [position, setPosition] = useState<PositionProps>({
    left: 0,
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
        setPosition={setPosition}
        setSelectedTab={setSelectedTab}
        name="instructions"
      >
        Instructions
      </Tab>
      <Tab
        position={position}
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
  setPosition: (position: PositionProps) => void;
  setSelectedTab: (name: string) => void;
  name: string;
};

const Tab = ({
  children,
  position,
  setPosition,
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
      <p className="relative py-1 text-sm z-10 text-center block text-black">
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
