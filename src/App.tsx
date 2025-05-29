import { Route, Routes } from 'react-router';

import Home from './Home';
import BookProvider from './context/RecipeBookContext';

function App() {
  return (
    <BookProvider>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
      </Routes>
    </BookProvider>
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
