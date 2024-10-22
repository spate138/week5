import { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import List from './components/List';
import NavBar from './components/Navbar';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ intolerances: '', minServings: '', maxServings: '' });
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch data with applied filters
  const fetchData = async () => {
    try {
      setLoading(true); // Display loading state while fetching data
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: '6279f54d76d743e5a618dcb00925112e', // Insert your API key here
            query,
            intolerances: filters.intolerances || undefined,
            minServings: filters.minServings || undefined,
            maxServings: filters.maxServings || undefined,
            number: 10,
            addRecipeNutrition: true, // Include nutrition data for calorie statistics
          },
        }
      );
      setRecipes(response.data.results);
      setTotalResults(response.data.results.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Remove loading state once fetching is complete
    }
  };

  // Compute summary statistics for calories
  const calculateCaloriesStats = (recipes) => {
    const calories = recipes
      .map(recipe => recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories')?.amount || 0)
      .filter(Boolean);

    if (calories.length === 0) return { mean: 0, median: 0, min: 0, max: 0 };

    const sum = calories.reduce((acc, curr) => acc + curr, 0);
    const mean = (sum / calories.length).toFixed(2);
    const sortedCalories = [...calories].sort((a, b) => a - b);
    const median = sortedCalories[Math.floor(sortedCalories.length / 2)] || 0;
    const min = Math.min(...sortedCalories);
    const max = Math.max(...sortedCalories);

    return { mean, median, min, max };
  };

  const handleSearchClick = () => {
    fetchData(); // Call the fetch function when the button is clicked
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const stats = calculateCaloriesStats(recipes);

  return (
    <div>
      <Header />
      <NavBar />

      <div style={styles.container}>
        <div style={styles.searchFilter}>
          <input
            type="text"
            placeholder="Search for recipes"
            value={query}
            onChange={handleSearchChange}
            style={styles.input}
          />
          <input
            type="text"
            name="intolerances"
            placeholder="Intolerances (e.g., gluten)"
            value={filters.intolerances}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="number"
            name="minServings"
            placeholder="Min Servings"
            value={filters.minServings}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="number"
            name="maxServings"
            placeholder="Max Servings"
            value={filters.maxServings}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <button onClick={handleSearchClick} style={styles.button}>
            Search
          </button>
        </div>

        {loading ? (
          <p>Loading...</p> // Display loading indicator while fetching
        ) : (
          <div>
            <h3>Total Recipes: {totalResults}</h3>
            <List recipes={recipes} />

            {/* Displaying summary statistics */}
            <div>
              <h3>Calories Summary Statistics</h3>
              <p>Mean: {stats.mean}</p>
              <p>Median: {stats.median}</p>
              <p>Min: {stats.min}</p>
              <p>Max: {stats.max}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  searchFilter: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default App;
