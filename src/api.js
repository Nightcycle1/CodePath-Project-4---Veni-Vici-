export const fetchCatData = (apiKey, banList) => {
    return fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data[0]?.breeds?.[0]?.name && banList.includes(data[0].breeds[0].name)) {
          return null; // Return null if breed is banned
        }
        return data[0]; // Return cat data
      });
  };
  
