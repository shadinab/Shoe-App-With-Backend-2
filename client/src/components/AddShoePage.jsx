import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// const baseURL = import.meta.env.VITE_ENV==='development'
// ? import.meta.env.VITE_BASE_URL_PRODUCTION;

const AddShoePage = () => {
  const navigate = useNavigate();
  const [shoeData, setShoeData] = useState({
    // name: '',
    // price: '',
    // link: '',
    // image: '',
    // description: '',
    // brand: '',
    name: 'FORTARUN 2.0',
    brand: 'adidas',
    price: 47,
    image:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fe412a58dd7049ceb82c4e0827a19a9f_9366/X_PLRPHASE_Shoes_Kids_White_IF2761_01_standard.jpg',
    createdAt: '2023-12-09T16:32:43.580Z',
    id: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if a request is in progress
  const [error, setError] = useState(null); // Track errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShoeData({ ...shoeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return; // Prevent multiple submissions while a request is in progress
    }

    // Basic validation
    if (!shoeData.name || !shoeData.price || !shoeData.image) {
      setError('Please fill in all fields.');
      return;
    }

    // Additional validation for the image URL
    const imageUrlRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    if (!imageUrlRegex.test(shoeData.image)) {
      setError(
        'Please provide a valid image URL ending with .jpg, .jpeg, .png, .gif, or .bmp.'
      );
      return;
    }

    if (shoeData.name.length < 5) {
      setError('Shoe name must be at least 5 characters long.');
      return;
    }

    const priceValue = parseFloat(shoeData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please provide a valid positive number for the price.');
      return;
    }
    // All validation passed, proceed with the request
    setError(null);
    setIsSubmitting(true);

    // Simulate a request (you would replace this with your actual API call)
    try {
      // Send a POST request to your API endpoint
      const response = await fetch(
        'http://localhost:5000/api/v1/shoes/addingshoes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shoeData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add shoe. Please try again.');
      }

      // Clear the form after successful submission
      setIsSubmitting(false);
      console.log('Shoe added successfully!');
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
      setIsSubmitting(false);
    }

    // Simulate a 2-second delay for the request

    // Clear the form after submission
    setShoeData({ name: '', brand: '', price: '', image: '', createdAt: '' });
    // setShoeData({ name: '', price: '', link: '', description: '' });
    navigate('/shoes');
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form's visibility
  };

  const handleReturn = () => {
    navigate('/shoes');
  };

  return (
    <div className="centerShoeAdd">
      <button className="button1" onClick={handleReturn}>
        Return to the list
      </button>
      <h1>Shoe app</h1>
      <h2>Add a New Shoe</h2>
      <button className="button" onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add Shoe'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="input">
            <label htmlFor="link">Shoe Image Link:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={shoeData.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="name">Shoe Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shoeData.name}
              onChange={handleInputChange}
              minLength="5" // Minimum length of 5 characters
              required // Make the field required
            />
          </div>
          <div className="input">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={shoeData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <div className="input">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={shoeData.description}
              onChange={handleInputChange}
              required
            />
          </div> */}
          <div className="button-add-shoe">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add Your New Shoe'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddShoePage;
