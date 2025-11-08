export async function createUserStory(data) {
  try {
    const response = await fetch('http://localhost:5050/api/userstories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.error("Error creating user story:", err);
    throw err;
  }
}
