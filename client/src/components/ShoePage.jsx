import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css';


const ShoePage = () => {
  // const baseURL =
  //   import.meta.env.VITE_ENV === 'development'
  //     ? import.meta.env.VITE_BASE_URL_DEVELOPMENT
  //     : import.meta.env.VITE_BASE_URL_PRODUCTION;
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(JSON.parse(localStorage.getItem('shoe')));
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // If you want to cancel the edit and revert to the original data,
    // you can reset the shoe state to its original value from localStorage.
    const originalShoe = JSON.parse(localStorage.getItem('shoe'));
    setShoe(originalShoe);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Assuming you have an API endpoint like '/api/shoes/:id' where :id is the shoe's ID
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/shoes/${shoe.id}`;
    // const apiUrl = `baseURL/shoes/${shoe.id}`;

    // Prepare the updated data to send to the API
    const updatedShoeData = {
      name: shoe.name,
      // description: shoe.description,
      price: shoe.price,
      link: shoe.image,
    };

    // Make a PUT request to update the shoe data
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShoeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update shoe data');
        }
        // Handle success here, e.g., show a success message to the user
        setIsEditing(false); // Exit edit mode after successful save
      })
      .catch((error) => {
        console.error('Error updating shoe data:', error);
        // Handle errors here, e.g., show an error message to the user
      });
  };

  // const handleDelete = () => {
  //   // Assuming you have an API endpoint like '/api/shoes/:id' where :id is the shoe's ID
  //   const apiUrl = `http://localhost:5000/api/v1/shoes/:id`;

  //   // Make a DELETE request to remove the shoe data
  //   fetch(apiUrl, {
  //     method: 'DELETE',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to delete the shoe');
  //       }
  //       // Handle success here, e.g., redirect to a different page or show a success message
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting the shoe:', error);
  //       // Handle errors here, e.g., show an error message to the user
  //     });
  //   navigate('/shoes');
  // };


  const handleDelete = () => {
  // Replace ':id' with the actual ID of the shoe you want to delete
  // const apiUrl = `${baseURL}/shoes/${shoe.id}`;
  const apiUrl = `${import.meta.env.VITE_BASE_URL}/shoes/${shoe.id}`;

  // Make a DELETE request to remove the shoe data
  fetch(apiUrl, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete the shoe');
      }
      // Handle success here, e.g., redirect to a different page or show a success message
      navigate('/shoes');
    })
    .catch((error) => {
      console.error('Error deleting the shoe:', error);
      // Handle errors here, e.g., show an error message to the user
    });
};

  const handleReturn = () => {
    navigate('/shoes');
  };

  return (
    <div className="centerShoeAdd2 ">
      <div>
        {isEditing ? (
          <div className="centerShoeAdd center1">
            <label>Name:</label>
            <input
              type="text"
              value={shoe.name}
              onChange={(e) => setShoe({ ...shoe, name: e.target.value })}
            />
            <br />
            <label>Description:</label>
            <input
              type="text"
              value={shoe.description}
              onChange={(e) =>
                setShoe({ ...shoe, description: e.target.value })
              }
            />
            <br />
            <label>Price:</label>
            <input
              type="text"
              value={shoe.price}
              onChange={(e) => setShoe({ ...shoe, price: e.target.value })}
            />
            <br />
            <label>Image URL:</label>
            <input
              type="text"
              value={shoe.image}
              onChange={(e) => setShoe({ ...shoe, image: e.target.value })}
            />
            <br />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>{shoe.name}</h2>
            <img src={shoe.image} alt="Shoe" />
            <p>{shoe.price}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleReturn}>Return</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoePage;
