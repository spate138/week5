import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: { apiKey: '6279f54d76d743e5a618dcb00925112e' }
      });
      setRecipe(response.data);
    };
    fetchRecipeDetail();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.summary}</p>
      {/* Add more recipe details as needed */}
    </div>
  );
};

export default RecipeDetail;
