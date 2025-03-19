const API_URL = import.meta.env.VITE_API_URL;

export const createGif = async (imageUrls: string[]) => {
  try {
    const response = await fetch(`${API_URL}/generateGif`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls }),
    });

    if (!response.ok) {
      throw new Error("Error generating GIF");
    }

    return await response.json(); // return { id, gifUrl }
  } catch (error) {
    console.error("Error in API generateGif:", error);
    throw error;
  }
};

