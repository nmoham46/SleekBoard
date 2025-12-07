import Http from "@/plugins/Http"

import { HttpStatusCode } from "axios"


export const fetchAllUserStories = async () => {
  const path = "/api/v1/user-stories/"

  const options = {
    method: "GET",
    url: path
  }

  try {
    const response = await Http(options)
    return response.status == HttpStatusCode.Ok ? response.data : null
  }
  catch (error) {
    console.error("Failure in getAllUserStories api call")
    console.error("Error: " + error)
    throw new Error()
  }
}

export const createUserStory = async (data) => {
  const path = `/api/v1/user-stories/`

  const options = {
    method: "POST",
    url: path,
    data: data
  }

  try {
    await Http(options)
  }
  catch (error) {
    console.error("Failure in createUserStory api call")
    console.error("Error: " + error)
    throw new Error()
  }
}

export const updateUserStory = async (id, data) => {
  const path = `/api/v1/user-stories/${id}`

  const options = {
    method: "PUT",
    url: path,
    data: data
  }

  try {
    await Http(options)
  }
  catch (error) {
    console.error("Failure in updateUserStory api call")
    console.error("Error: " + error)
    throw new Error()
  }
}

export const deleteUserStory = async (id) => {
  const path = `/api/v1/user-stories/${id}`

  const options = {
    method: "DELETE",
    url: path
  }

  try {
    await Http(options)
  }
  catch (error) {
    console.error("Failure in deleteUserStory api call")
    console.error("Error: " + error)
    throw new Error()
  }
}


export const getUserStoryByID = async (id) => {
  const path = `/api/v1/user-stories/${id}`;

  const options = {
    method: "GET",
    url: path,
  };

  try {
    const res = await Http(options);

    const story = res?.data;
            
    return story;
  } catch (error) {
    console.error("Failure in getUserStoryByID api call");
    console.error("Error:", error);
    throw error;
  }
};
