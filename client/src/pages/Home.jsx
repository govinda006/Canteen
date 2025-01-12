import { useAuth } from "../storage/auth";

const Home = () => {
  const { foods } = useAuth();

  const handleViewItemsClick = (food) => {
    console.log("View items clicked for:", food);
    // Add your logic here to handle the click event
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1 className="main-heading">Welcome to GECIA&apos;s CANTEEN</h1>
          <p className="description">Your favorite meal, freshly prepared!</p>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-heading">See what&apos;s in the menu</h2>
        </div>
        <div className="container grid grid-four-cols">
          {foods.map((curElem, index) => {
            const { name, description, provider } = curElem;
            return (
              <div className="card" key={index}>
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
                    <button onClick={() => handleViewItemsClick(curElem)}>
                      View Items
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
