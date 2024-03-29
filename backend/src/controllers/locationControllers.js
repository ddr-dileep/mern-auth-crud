import User from "../models/userModels.js";
import apiResponse from "../utils/apiResponse.js";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

const locationControllers = {
  getNearByUser: async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
      const users = await User.find({}).select("-password -_id -__v");

      const usersWithDistances = users.map((user) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          user.latitude,
          user.longitude
        );
        return { ...user.toObject(), distance };
      });

      usersWithDistances.sort((a, b) => a.distance - b.distance);
      const nearestUsers = usersWithDistances.slice(0, 5);

      return apiResponse.success(res, nearestUsers);
    } catch (error) {
      return apiResponse.error(res, error);
    }
  },
};

export default locationControllers;
