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
