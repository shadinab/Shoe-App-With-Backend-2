import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Spinner from './Spinner';
import ShoePage from './ShoePage';
import EmailData from './EmailData';

function MyComponent() {
  const [data, setData] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // to selectt the image edit page
  const [selectedShoe, setSelectedShoe] = useState(null);

  useEffect(() => {
    // This code will run when the component mounts
    axios
      .get('http://localhost:5000/api/v1/shoes/getAllShoes') // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data);

        setTimeout(() => {
          setShowImages(true);
          setLoading(false);
        }, 100); // Adjust the delay
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const addshoe = () => {
    navigate('/shoes/add'); // Redirect to the /shoes route on successful registration
  };
  const handleShoeClick = (shoe) => {
    // When an image is clicked, set the selected shoe and navigate to the edit page
    setSelectedShoe(shoe);
    // fetchDataToOtherCompent(shoe);
    // console.log("shoe", shoe);
    localStorage.setItem('shoe', JSON.stringify(shoe));

    // let saveShoeOnLocalStorge = JSON.stringify(localStorage.setItem("shoe",shoe))
    navigate(`/shoes/${shoe.id}`);
  };

  const logout = () => {
    navigate('/'); // Redirect to the /shoes route on successful registration
  };
  console.log('data', data);
  return (
    <div>
      <button className="button center1" onClick={addshoe}>
        Add Shoes
      </button>
      <div className="center1">
        <EmailData />
      </div>
      <button className="logout-button" onClick={logout}>
        log out
      </button>
      <Spinner loading={loading} />
      <div className="cat-list">
        {data.map((dat, index) => (
          <div className="cat-item" key={dat.id}>
            {showImages && (
              // Conditionally render the image after a delay
              <img
                src={dat.image}
                alt="error"
                style={{
                  display: 'block',
                  animation: `fadeIn 1s ease ${index}s both`,
                }}
                onClick={() => handleShoeClick(dat)}
              />
            )}
            <h3>{dat.name}</h3>
            <p>Price: ${dat.price}</p>
          </div>
        ))}
      </div>
      {selectedShoe && (
        <ShoePage
          shoe={{
            id: selectedShoe.id,
            name: selectedShoe.name,
            link: selectedShoe.link,
            price: selectedShoe.price,
          }}
        />
      )}
    </div>
  );
}

export default MyComponent;
