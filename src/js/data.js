import axiosInstance from "./api/axiosInstance.js";

export async function getStories({ page = 1, size = 12, location = 0 } = {}) {
  try {
    const response = await axiosInstance.get("/stories", {
      params: { page, size, location },
    });
    return response.data.listStory;
  } catch (error) {
    console.error("Gagal fetch stories:", error);
    return [];
  }
}

export async function addStory({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  if (lat !== undefined) formData.append("lat", lat);
  if (lon !== undefined) formData.append("lon", lon);

  try {
    const response = await axiosInstance.post("/stories", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
