import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  

const CaloriesChart = ({ recipes }) => {
  const labels = recipes.map(recipe => recipe.title);
  const data = recipes.map(recipe => recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0);

  return (
    <div>
      <h3>Calories Distribution</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Calories',
              data,
            },
          ],
        }}
      />
    </div>
  );
};

CaloriesChart.propTypes = {
    recipes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        nutrition: PropTypes.shape({
          nutrients: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              amount: PropTypes.number,
            })
          ),
        }),
      })
    ).isRequired,
  };

export default CaloriesChart;
