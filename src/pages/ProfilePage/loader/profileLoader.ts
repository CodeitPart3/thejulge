import { getUser } from "@/apis/services/userService";

const profileLoader = async () => {
  const userInfo = await getUser("42859259-b879-408c-8edd-bbaa3a79c674");

  if (userInfo.status === 200) {
    return {
      userInfo: userInfo.data.item,
    };
  }
};

export default profileLoader;
