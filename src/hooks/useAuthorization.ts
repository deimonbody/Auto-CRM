import { useAppSelector } from "@src/store/hooks";

export const useAuthorization = (): boolean => {
  const { user, isLoading } = useAppSelector((state) => state.userReducer);
  return !!(!isLoading && user);
};
