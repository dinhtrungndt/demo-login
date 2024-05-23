import React, { useEffect, useState } from "react";
import { getFriends } from "../../../../services/user/user";

export const ListFriend = () => {
  const id_user = JSON.parse(localStorage.getItem("id_user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [friends, setFriends] = useState([]);

  const onGetFriends = async () => {
    try {
      const response = await getFriends(id_user, token);
      setFriends(response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

  //   console.log("friends", friends.summary.total_count);

  useEffect(() => {
    onGetFriends();
  }, []);

  return (
    <div>
      <h1 className="font-bold">
        Tổng bạn bè của bạn là: {friends?.summary?.total_count}
      </h1>
      <div className="grid grid-cols-3 gap-4 p-2">
        {friends?.data?.map((friend) => (
          <div key={friend.id}>
            <h3>{friend.name}</h3>
            <img
              src={friend.picture.data.url}
              alt={friend.name}
              width={50}
              className="rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
