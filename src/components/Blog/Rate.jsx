import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import API from "../../API";

function Rate(props) {
    const [rating, setRating] = useState(0);
    const [totalRates, setTotalRates] = useState(0); // Theo dõi tổng số lượt đánh giá
    const [userRating, setUserRating] = useState(null); // Lưu rating của người dùng nếu có
    let params = useParams();

    useEffect(() => {
        const url = 'blog/rate/' + params.id;
        API.get(url)
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    let tongRate = response.data.data.reduce((sum, value) => sum + value.rate, 0);
                    let tbcRate = tongRate / response.data.data.length;
                    setRating(tbcRate);
                    setTotalRates(response.data.data.length); // Cập nhật tổng số lượt đánh giá

                    // Kiểm tra nếu người dùng đã đánh giá trước đó
                    const dataUser = JSON.parse(localStorage.getItem('authUser'));
                    const userPreviousRating = response.data.data.find(r => r.user_id === dataUser.id);
                    if (userPreviousRating) {
                        setUserRating(userPreviousRating.rate);
                    }
                }
            })
            .catch((error) => console.log(error));
    }, [params.id]);

    const changeRating = (newRating, name) => {
        if (!localStorage.getItem('login')) {
            alert("Bạn chưa login");
            return;
        }

        const previousUserRating = userRating;
        const newTotalRates = userRating ? totalRates : totalRates + 1;
        const newAvgRating = userRating
            ? ((rating * totalRates) - previousUserRating + newRating) / totalRates
            : ((rating * totalRates) + newRating) / newTotalRates;

        setRating(newAvgRating);
        setTotalRates(newTotalRates);
        setUserRating(newRating);

        const dataUser = JSON.parse(localStorage.getItem('authUser'));
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const url = '/blog/rate/' + params.id;

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        };

        const formData = new FormData();
        formData.append('user_id', dataUser.id);
        formData.append('blog_id', params.id);
        formData.append('rate', newRating);

        API.post(url, formData, config)
            .then(response => {
                if (response.data.errors) {
                    console.log(response.data.errors);
                    // Khôi phục trạng thái trước đó nếu có lỗi từ API
                    setRating(previousUserRating
                        ? ((rating * totalRates) + previousUserRating - newRating) / totalRates
                        : ((rating * totalRates) - newRating) / (newTotalRates - 1));
                    setTotalRates(userRating ? totalRates : totalRates - 1);
                    setUserRating(previousUserRating);
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
                // Khôi phục trạng thái nếu có lỗi
                setRating(previousUserRating
                    ? ((rating * totalRates) + previousUserRating - newRating) / totalRates
                    : ((rating * totalRates) - newRating) / (newTotalRates - 1));
                setTotalRates(userRating ? totalRates : totalRates - 1);
                setUserRating(previousUserRating);
            });
    };

    return (
        <StarRatings
            rating={rating || 0} // Đảm bảo rằng rating không phải là undefined
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={5}
            name='rating'
        />

    );
}

export default Rate;
