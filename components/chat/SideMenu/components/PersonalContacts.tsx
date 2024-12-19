import { apiClient } from "@/lib/api-client";

import { GET_PERSONAL_CONTACTS } from "@/utils/constants";

import { useEffect } from "react"

const PersonalContacts = () => {

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_PERSONAL_CONTACTS, {
          withCredentials: true
        });

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    getContacts();
  }, [])

  return (
    <div>PersonalContacts</div>
  )
}
export default PersonalContacts