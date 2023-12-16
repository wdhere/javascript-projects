import axios from "axios";

export function getLocation(lat, lon) {
  return axios
    .get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en",
      {
        params: {
          latitude: lat,
          longitude: lon,
        },
      }
    )
    .then(({ data }) => {
      return data.city;
    });
}
