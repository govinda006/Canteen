import PropTypes from 'prop-types';

const Card = ({ foods, handleCardClick }) => (
  <div className="container grid grid-four-cols">
    {foods.map((curElem, index) => {
      const { name, description, provider } = curElem;
      return (
        <div
          className="card cursor-pointer"
          key={index}
          onClick={() => handleCardClick(curElem)}
        >
          <div className="card-img">
            <p>{name}</p>
            <img
              src="/images/GECIA-CANTEEN.png" // Ensure this path is correct
              alt="breakfast-img"
              width="150"
              height="150"
            />
          </div>

          <div className="card-details">
            <div className="grid grid-two-cols">
              <p>{description}</p>
              <p>{provider}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

Card.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Card;

