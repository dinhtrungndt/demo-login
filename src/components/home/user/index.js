import React, { useEffect, useState } from "react";
import axios from "axios";

export const DetailInfor = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const idUser = "100015115748911";
  const accessToken =
    "EAAGNO4a7r2wBO4ww3XJeVooZCOOvu6bZAFJFHUc1AsAtQDTxvIcxWKlB4Lc5txIubeMgluUGpIdvs600dUn6IdZBJIZBZAdtfBpBeLE7ZAehWZCaMiMf0tD2GaBfEGOqZCIMyi1URTAMnziqtj5zQDtHtPG1aamSWwQWu0YqHsoGzaeIZAvnyBYCxGiTZCH3e05fFZCePiPKeNPZAwZDZD";

  const onGetDataDetailUser = async () => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${idUser}?access_token=${accessToken}`
      );
      console.log(">>>>>. response in onGetDataDetailUser", response);
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetDataDetailUser();
  }, []);

  //   console.log(">>>>>. user", user);

  if (loading) {
    return <h5> Loading... </h5>;
  }

  if (!user) {
    return <h5> Không tìm thấy user </h5>;
  }

  return (
    <div>
      {/* Hiển thị ra danh sách chi tiết của user đang đăng nhập đựa vào graph API facebook */}
      {/* https://graph.facebook.com/USER-ID?access_token=ACCESS_TOKEN */}
      <h5> Chi tiết thông tin của user </h5>
    </div>
  );
};
