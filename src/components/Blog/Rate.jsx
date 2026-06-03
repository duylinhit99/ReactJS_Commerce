import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import API from "../../API";
import {
  getAuthUser,
  getAuthHeaders,
  isLoggedIn,
} from "../../utils/auth";

function Rate({ idBlog }) {
  const [rating, setRating] = useState(0);
  const [totalRates, setTotalRates] = useState(0);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    API.get(`blog/rate/${idBlog}`)
      .then((response) => {
        const rates = response.data?.data;
        if (!Array.isArray(rates) || rates.length === 0) return;

        const sum = rates.reduce((acc, item) => acc + item.rate, 0);
        setRating(sum / rates.length);
        setTotalRates(rates.length);

        const user = getAuthUser();
        const previous = rates.find((r) => r.user_id === user?.id);
        if (previous) setUserRating(previous.rate);
      })
      .catch((err) => console.error(err));
  }, [idBlog]);

  function changeRating(newRating) {
    if (!isLoggedIn()) {
      alert("Bạn chưa đăng nhập");
      return;
    }

    const user = getAuthUser();
    if (!user?.id) return;

    const previousUserRating = userRating;
    const previousRating = rating;
    const previousTotalRates = totalRates;
    const newTotalRates = userRating ? totalRates : totalRates + 1;
    const newAvgRating = userRating
      ? (rating * totalRates - previousUserRating + newRating) / totalRates
      : (rating * totalRates + newRating) / newTotalRates;

    setRating(newAvgRating);
    setTotalRates(newTotalRates);
    setUserRating(newRating);

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("blog_id", idBlog);
    formData.append("rate", newRating);

    function rollbackRating() {
      setRating(
        previousUserRating
          ? (previousRating * previousTotalRates +
              previousUserRating -
              newRating) /
              previousTotalRates
          : (previousRating * previousTotalRates - newRating) /
              (newTotalRates - 1)
      );
      setTotalRates(previousUserRating ? previousTotalRates : newTotalRates - 1);
      setUserRating(previousUserRating);
    }

    API.post(`/blog/rate/${idBlog}`, formData, { headers: getAuthHeaders() })
      .then((response) => {
        if (response.data.errors) {
          rollbackRating();
        }
      })
      .catch((err) => {
        console.error(err);
        rollbackRating();
      });
  }

  return (
    <StarRatings
      rating={rating || 0}
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={5}
      name="rating"
    />
  );
}

export default Rate;
