import { useState } from "react";
import { getLoggedinUser } from "../api/apiCore";

export const useProfile = () => {
  const userProfileSession = getLoggedinUser();

  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession.user : null
  );

  return { userProfile, loading };
};
