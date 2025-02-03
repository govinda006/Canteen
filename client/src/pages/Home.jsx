import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { useAuth } from "../storage/auth";

const Home = () => {
  const { foods } = useAuth({});
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const itemsSectionRef = useRef(null);
  const categoriesSectionRef = useRef(null);

  const handleCardClick = (food) => {
    console.log("Card clicked for:", food);
    setSelectedFoodItems((prevState) =>
      prevState.length > 0 && prevState[0].name === food.items[0].name
        ? []
        : food.items
    );
  };

  const handleItemsSectionClick = () => {
    setSelectedFoodItems([]);
    if (categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedFoodItems.length > 0 && itemsSectionRef.current) {
      itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedFoodItems]);

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1 className="main-heading">Welcome to GECIA&apos;s CANTEEN</h1>
          <p className="description">Your favorite meal, freshly prepared!</p>
        </div>
      </section>

      <section className="categories-section" ref={categoriesSectionRef}>
        <div className="container">
          <h2 className="section-heading">See what&apos;s in the menu</h2>
        </div>
        <Card foods={foods} handleCardClick={handleCardClick} />{" "}
        {/* Use the Card component */}
      </section>

      {selectedFoodItems.length > 0 && (
        <section
          className="food-items-section py-12 bg-gray-50"
          ref={itemsSectionRef}
          onClick={handleItemsSectionClick}
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Today&apos;s Menu
            </h2>
            <ul className="space-y-4">
              {selectedFoodItems.map((item, index) => (
                <li key={index} className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  {item.photo && (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
