import { getUser } from "@/apis/services/userService";
import { useUserStore } from "@/hooks/useUserStore";

const profileLoader = async () => {
  const userId = useUserStore.getState().user?.id;
  const userInfo = await getUser(userId ?? "");

  if (userInfo.status === 200) {
    return {
      userInfo: userInfo.data.item,
    };
  }
};

export default profileLoader;
