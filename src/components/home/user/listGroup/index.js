import React, { useEffect, useState } from "react";
import { getGroups } from "../../../../services/user/user";

export const ListGroups = () => {
  const id_user = JSON.parse(localStorage.getItem("id_user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [groups, setGroups] = useState([]);

  const onGetGroups = async () => {
    try {
      const response = await getGroups(id_user, token);
      setGroups(response);
      return response;
    } catch (error) {
      console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
      throw error;
    }
  };

  console.log("groups", groups);

  useEffect(() => {
    onGetGroups();
  }, []);
  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <img src={group.picture.data.url} alt={group.name} width={50} />
        </div>
      ))}
    </div>
  );
};
