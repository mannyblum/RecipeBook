import { Route, Routes } from "react-router";
import RecipeBook from "./components/RecipeBook";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <div className="bg-amber-50 h-screen py-2 pb-4 md:py-20">
      <Routes>
        <Route index element={<RecipeBook />} />
        <Route path="details/:mealId" element={<RecipeDetails />} />
      </Routes>
      {/* <RecipeBook /> */}
    </div>
  );
}

export default App;

// 1. 🔍 Search Functionality
//  [x] Input field to search recipes by keyword (e.g. “chicken”, “pasta”)
//  [ ] Submit button or search-on-type functionality (debounced)
//  [ ] Handle empty or invalid searches (show appropriate message)
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
//  [ ] Clicking a recipe opens a detailed view (modal, drawer, or separate page/route):
//  [ ] Full recipe title
//  [ ] Full-size image
//  [ ] List of ingredients
//  [ ] Instructions or cooking steps
//  [ ] Optional: video or source link (if available)
//  [ ] "Back to search results" button or modal close
//
// 5. 🧠 State Management
//  [ ] Store:
//  [ ] Search query
//  [ ] List of search results
//  [ ] Selected recipe (for detailed view)
//  [ ] Handle edge cases (e.g., no recipe selected, API errors, loading state)
