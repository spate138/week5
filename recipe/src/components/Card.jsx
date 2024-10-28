import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ recipe }) => {
  return (
    <div style={styles.card}>
      <Link to={`/recipe/${recipe.id}`}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} style={styles.image} />
      </Link>
    </div>
  );
};

Card.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    textAlign: 'center',
    width: '200px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
};

export default Card;
