import React, { useEffect, useState } from "react";
import { getAccounts } from "../../../services/user/user";

export const DetailInfor = () => {
  const id_user = JSON.parse(localStorage.getItem("id_user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [accounts, setAccounts] = useState([]);

  // console.log("accounts", accounts);

  const formatGender = () => {
    if (accounts.gender === "male") {
      return "Nam";
    }
    return "Nữ";
  };

  const onGetAccounts = async (idUser, accessToken) => {
    try {
      const response = await getAccounts(idUser, accessToken);
      setAccounts(response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

  useEffect(() => {
    onGetAccounts(id_user, token);
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-4">
          <img
            className="w-full h-full rounded-full object-cover"
            src={accounts?.picture?.data?.url}
            alt="Avatar của bạn"
          />
        </div>
        <div className="w-full max-w-md text-center">
          <p className="text-gray-700 flex justify-center">
            <span className="text-black font-semibold pr-1">Tên:</span>
            {accounts?.name}
          </p>
          <p className="text-gray-700 flex justify-center">
            <span className="text-black font-semibold pr-1">Email:</span>
            {accounts?.email}
          </p>
          <p className="text-gray-700 flex justify-center">
            <span className="text-black font-semibold pr-1">Địa chỉ:</span>
            {accounts?.location?.name}
          </p>
          <p className="text-gray-700 flex justify-center">
            <span className="text-black font-semibold pr-1">
              Số điện thoại:
            </span>
            Vui lòng cập nhật
          </p>
          <p className="text-gray-700 flex justify-center">
            <span className="text-black font-semibold pr-1">Giới tính:</span>
            {formatGender()}
          </p>
        </div>
      </div>
    </div>
  );
};
