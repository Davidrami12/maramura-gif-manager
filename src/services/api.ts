const API_URL = "https://generategif-vqn2qei5nq-uc.a.run.app";

export const generateGif = async (imageUrls: string[], title: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls, title }),
    });

    if (!response.ok) {
      throw new Error("Error generating GIF");
    }

    return await response.json(); // return { id, gifUrl }
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};

