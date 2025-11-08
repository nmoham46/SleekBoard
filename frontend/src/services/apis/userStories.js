const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export async function createUserStory(data) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user-stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.error("Error creating user story:", err);
    throw err;
  }
}