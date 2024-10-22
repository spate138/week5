import PropTypes from 'prop-types';
import Card from './Card';

const List = ({ recipes }) => {
  return (
    <div style={styles.list}>
      {recipes.map((recipe) => (
        <Card key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

List.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default List;
