function getAllTasks() {
    const apiUrl = 'https://productservice-0lvt.onrender.com/products';
  
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        return data; // Return the data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error for handling elsewhere if needed
      });
  }
  
  // Usage
  getAllTasks()
    .then(data => {
      console.log('API response:', data);
      // Handle the data from the API
    })
    .catch(error => {
      console.error('Error:', error);
    });
  