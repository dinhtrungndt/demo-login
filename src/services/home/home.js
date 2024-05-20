import AxiosInstance from "../../helper/Axiosinstance";

// Chi tiết page
export const getDetailPage = async (pageId, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts/${pageId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy tất cả bài viết trong page
export const getPostsInPage = async (pageId, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts-all/${pageId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy danh sách comment của bài viết
export const getComments = async (postId, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/comments/get-comments-facebook/${postId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Đăng bài viết
export const postStatus = async (pageId, accessToken, message) => {
  try {
    const response = await AxiosInstance().post(
      `/posts/post-posts/${pageId}/${accessToken}`,
      { message }
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Sửa bài viết
export const editPost = async (postId, accessToken, message) => {
  try {
    const response = await AxiosInstance().put(
      `/posts/update-posts/${postId}/${accessToken}`,
      { message }
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Xóa bài viết
export const deletePost = async (postId, accessToken) => {
  try {
    const response = await AxiosInstance().delete(
      `/posts/delete-posts/${postId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};
