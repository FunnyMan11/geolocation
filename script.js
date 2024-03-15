const locationButton = document.getElementById("get-location");
const locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchLocation(position.coords.latitude, position.coords.longitude)
          .then(location => displayLocation(location))
          .catch(error => handleLocationError(error));
      },
      error => handleLocationError(error)
    );
  } else {
    locationDiv.innerText = "Your browser doesn't support geolocation.";
  }
}

function fetchLocation(latitude, longitude) {
  return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => `${data.address.city}, ${data.address.country}`);
}

function displayLocation(location) {
  locationDiv.innerText = `Your location is: ${location}`;
}

function handleLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to your location.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get your location timed out.";
      break;
    default:
      locationDiv.innerText = "An unknown error occurred while getting your location.";
  }
}