const API_URL = import.meta.env.VITE_API_URL;

export const createGif = async (imageUrls: string[]) => {
  try {
    const response = await fetch(`${API_URL}/createGif`, {
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
    console.error("Error in API createGif:", error);
    throw error;
  }
}

export const getAllGifs = async () => {
  try {
    const response = await fetch(`${API_URL}/getAllGifs`);
    if (!response.ok){
      throw new Error("Error loading GIFs");
    }
    
    const data = await response.json();
    return await data.gifs;

  } catch (error) {
    console.error("Error in API getAllGifs:", error);
    throw error;
  }
}

export const deleteGif = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/deleteGif`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Error deleting GIF");
    }

    return await response.json();
    
  } catch (error) {
    console.error("Error in deleteGif API:", error);
    throw error;
  }
}
