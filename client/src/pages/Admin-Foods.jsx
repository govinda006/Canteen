import { useEffect, useState } from "react";

export const AdminFoods = () => {
  const [foods, setFoods] = useState([]); // State to store food items
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to store errors

  // Fetch food items from the backend when the component mounts
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/food"); // Fetch from the backend
        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          setFoods(data); // Set the food items to state
        } else {
          setError("Failed to fetch food items");
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setLoading(false); // Set loading to false after request completion
      }
    };

    fetchFoods();
  }, []); // Empty dependency array ensures this runs only once

  // Show loading state or error message if data is not yet available
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <h1>Admin Foods Data</h1>
      {foods.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
