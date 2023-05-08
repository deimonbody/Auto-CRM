import { ROLE } from "@src/common/enum";

export const getSelectUserRole = (
  userRole: ROLE,
): {
  value: ROLE;
  label: ROLE;
}[] => {
  const keys = Object.values(ROLE);
  const select = [{ value: userRole, label: userRole }];
  keys.forEach((el) => {
    if (el !== userRole) {
      const item = { value: el, label: el };
      select.push(item);
    }
  });
  return select;
};
