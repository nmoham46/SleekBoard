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
/*
1.Get all user stories (no data only response json)
2.Get user story by id
3.Update/Edit user story by id
4.Delete user story by id
*/

export async function getAllUserStories() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user-stories`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching user stories:", err);
    throw err;
  }
}

/* 3. Get user story by ID */
export async function getUserStoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user-stories/${id}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching user story:", err);
    throw err;
  }
}