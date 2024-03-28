export const fetchUserLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback({ latitude, longitude }, null);
      },
      (error) => {
        console.error("Error getting location:", error);
        callback(null, error);
      }
    );
  } else {
    callback(null, "Geolocation is not supported");
  }
};
