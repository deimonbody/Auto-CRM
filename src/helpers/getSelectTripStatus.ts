import { TRIPSTATUS } from "@src/common/enum";

export const getSelectTripStatus = (
  tripStatus: TRIPSTATUS,
): {
  value: TRIPSTATUS;
  label: TRIPSTATUS;
}[] => {
  const keys = Object.values(TRIPSTATUS);
  const select = [{ value: tripStatus, label: tripStatus }];
  keys.forEach((el) => {
    if (el !== tripStatus) {
      const item = { value: el, label: el };
      select.push(item);
    }
  });
  return select;
};
