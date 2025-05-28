import { Route, Routes, useLocation, useNavigate } from "react-router";
import RecipeBook from "./components/RecipeBook";
import RecipeDetails from "./components/RecipeDetails";
import { AnimatePresence } from "motion/react";

import { ChevronLeftIcon } from "@primer/octicons-react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-amber-50 h-screen py-2 pb-4 ">
      <header className="mx-4 mb-2 flex flex-row items-center justify-between">
        {location.pathname !== "/" && (
          <button
            className="font-bold uppercased flex items-center py-1 px-1 bg-white text-sm border-2 rounded-sm border-black text-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-amber-500 active:shadow-none active:transform active:translate-[2px]"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon size={16} />
            {/* Back */}
          </button>
        )}
        <h1 className="antonio mx-auto text-center">RecipeBook</h1>
      </header>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<RecipeBook />} />
          <Route path="details/:mealId" element={<RecipeDetails />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

// 1. 🔍 Search Functionality
//  [x] Input field to search recipes by keyword (e.g. “chicken”, “pasta”)
//  [x] Submit button or search-on-type functionality (debounced)
//  [x] Handle empty or invalid searches (show appropriate message)
//
// 2. 🌐 API Integration
//  [x] Use a free public recipe API (e.g. TheMealDB or Edamam)
//  [x] Make API call on search submission
//  [x] Show a loading indicator while fetching data
//  [ ] Display a friendly message if no results are found
//
// 3. 📄 Results Display
//  [x] Render a list/grid of recipe cards:
//  [x] Recipe image (thumbnail)
//  [x] Recipe title
//  [ ] Short summary or category (if available)
//  [ ] Make sure the results are responsive (mobile-first)
//
// 4. 🔗 Recipe Detail View
//  [x] Clicking a recipe opens a detailed view (modal, drawer, or separate page/route):
//  [x] Full recipe title
//  [x] Full-size image
//  [ ] List of ingredients
//  [x] Instructions or cooking steps
//  [ ] Optional: video or source link (if available)
//  [ ] "Back to search results" button or modal close
//
// 5. 🧠 State Management
//  [ ] Store:
//  [ ] Search query
//  [ ] List of search results
//  [ ] Selected recipe (for detailed view)
//  [ ] Handle edge cases (e.g., no recipe selected, API errors, loading state)
