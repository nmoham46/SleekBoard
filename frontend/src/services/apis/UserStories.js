import Http from "@/plugins/Http"

import { SUCCESS_CODE } from "@/utils/GlobalVariables"

export const getAllUserStories = async () => {
  const path = "/api/v1/user-stories/"

  const options = {
    method: "GET",
    url: path
  }

  const response = await Http(options)
  return response.status == SUCCESS_CODE ? response.data : null
} 