import { createContext, useContext, useState, type ReactNode } from "react";
import type { Meal } from "../queryOptions/searchQueryOptions";

export interface RecipeBookContextType {
  meal: Meal;
  setMeal: (meal: Meal) => void;
}

const RecipeBookContext = createContext<RecipeBookContextType | undefined>(
  undefined
);

const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meal, setMeal] = useState<Meal>({} as Meal);

  return (
    <RecipeBookContext.Provider value={{ meal, setMeal }}>
      {children}
    </RecipeBookContext.Provider>
  );
};

export const useMeal = () => {
  const context = useContext(RecipeBookContext);
  if (context === undefined) {
    throw new Error("useMeal must be used within a MealProvider");
  }
  return context;
};

export default BookProvider;
