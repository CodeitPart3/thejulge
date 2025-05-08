import { getUser } from "@/apis/services/userService";
import { useUserStore } from "@/store/useUserStore";

const profileLoader = async () => {
  const userId = useUserStore.getState().user?.id;

  if (!userId) {
    return {};
  }

  const userInfo = await getUser(userId ?? "");

  if (userInfo.status === 200) {
    return {
      userInfo: userInfo.data.item,
    };
  }
};

export default profileLoader;
