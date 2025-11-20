// src/services/apis/comments.js
import Http from "@/plugins/Http";
import { HttpStatusCode } from "axios";

export const addComment = async (data) => {
  const path = `/api/v1/comments/`;

  const options = {
    method: "POST",
    url: path,
    data,
  };

  try {
    const res = await Http(options);
    return res?.data ?? res; 
  } catch (error) {
    console.error("Failure in addComments api call");
    console.error("Error: " + error);
    throw new Error();
  }
};

export const updateComment = async (id, data) => {
  const path = `/api/v1/comments/${id}`;

  const options = {
    method: "PUT",
    url: path,
    data,
  };

  try {
    const res = await Http(options);
    return res?.data ?? res; 
  } catch (error) {
    console.error("Failure in updateComment api call");
    console.error("Error: " + error);
    throw new Error();
  }
};

export const deleteComment = async (id) => {
  const path = `/api/v1/comments/${id}`;

  const options = {
    method: "DELETE",
    url: path,
  };

  try {
    const res = await Http(options);
    return res?.data ?? res;
  } catch (error) {
    console.error("Failure in Delete Comment api call");
    console.error("Error: " + error);
    throw new Error();
  }
};
