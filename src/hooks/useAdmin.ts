import { UserRole } from "@src/common/enum";
import { useAppSelector } from "@src/store/hooks";

export const useAdmin = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  if (user) {
    return user.userRole === UserRole.ADMIN;
  }
  return false;
};
