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

// Đăng bài viết
export const postStatus = async (pageId, accessToken, message, link) => {
  try {
    const response = await AxiosInstance().post(
      `/posts/post-posts/${pageId}/${accessToken}`,
      { message, link }
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

// Lấy danh sách comment reply của bài viết
export const getCommentsReply = async (commentId, accessToken) => {
  try {
    const response = await AxiosInstance().get(
      `/comments/get-reply-comments/${commentId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Thêm comment
export const postComment = async (postId, accessToken, message) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/comment-posts/${postId}/${accessToken}`,
      { message }
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// cập nhật comment
export const editComment = async (commentId, accessToken, message) => {
  try {
    const response = await AxiosInstance().put(
      `/comments/update-reply-comments/${commentId}/${accessToken}`,
      { message }
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Phản hồi bình luận comment
export const replyComment = async (commentId, accessToken, message) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/reply-comments/${commentId}/${accessToken}`,
      { message }
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Xóa comment
export const deleteComment = async (commentId, accessToken) => {
  try {
    const response = await AxiosInstance().delete(
      `/comments/delete-comments/${commentId}/${accessToken}`
    );
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// thêm vào cloundinary
export const uploadImageStatus = async (form) => {
  const response = await AxiosInstance("multipart/form-data").post(
    "cloudinary/upload-cloudinary",
    form
  );
  // console.log(">>>>>>>>>>>>>>>>>> 49 cloudinary cloudinary", response.url);
  return response.url;
};
