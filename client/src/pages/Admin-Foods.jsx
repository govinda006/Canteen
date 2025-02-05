import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../storage/auth"; // Import useAuth hook

export const AdminFoods = () => {
  const { authorizationToken } = useAuth(); // Use useAuth to get authorizationToken
  const [foods, setFoods] = useState([]); // State for foods data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to store errors

  const deleteFood = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/food/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`foods after delete ${data}`);

      if (response.ok) {
        getAllFoodsData().finally(() => setLoading(false));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getAllFoodsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/foods",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`foods ${data}`);
      setFoods([...data]); // Use spread operator to set foods
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFoodsData();
  }, []);

  // Show loading state or error message if data is not yet available
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <section className="admin-foods-section">
      <div className="container">
        <h1>Admin Foods Data</h1>
      </div>
      <div className="container admin-foods">
        {foods.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Description</th>
                <th>Availability</th> {/* Add Availability column */}
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.description}</td>
                  <td>{food.availability ? "Available" : "Not Available"}</td> {/* Display availability */}
                  <td>
                    <Link to={`/admin/foods/update/${food._id}`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteFood(food._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};
