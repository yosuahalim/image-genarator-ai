const fetchImages = () => {
  return fetch("/api/getImages", {
    cache: "no-store",
  }).then((response) => response.json());
};

export default fetchImages;
