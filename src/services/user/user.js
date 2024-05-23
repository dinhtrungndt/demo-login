import AxiosInstance from "../../helper/Axiosinstance";

export const getAccounts = async (idUser, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/accounts/${idUser}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy danh sách bài đăng của user
export const getPostsAccounts = async (idUser, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/accounts/get-posts-all/${idUser}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy danh sách bình luận của bài đăng
export const getCommentsAccounts = async (idPost, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/accounts/get-comments/${idPost}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy danh sách bạn bè theo id và token
export const getFriends = async (idUser, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/accounts/get-friends/${idUser}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// lấy danh sách nhóm theo id và token
export const getGroups = async (idUser, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/accounts/get-groups/${idUser}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};
