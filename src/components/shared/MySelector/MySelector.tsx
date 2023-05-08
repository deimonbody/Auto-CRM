import { ISelectValue } from "@src/common/interface";
import React from "react";
import { RefCallBack } from "react-hook-form";
import Select from "react-select";
import "./style.scss";

interface IProps<T> {
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder: string;
  options: ISelectValue<T>[];
  isMulti?: boolean;
  name?: string;
  selectRef?: RefCallBack;
  onChange?: (e: any) => void;
  value?: ISelectValue<T> | ISelectValue<T>[] | null;
  closeMenuOnSelect?: boolean;
}

const MySelector = <T,>({
  isClearable = false,
  isSearchable = false,
  placeholder,
  options,
  isMulti = false,
  name,
  selectRef,
  onChange,
  value,
  closeMenuOnSelect = true,
}: IProps<T>) => {
  return (
    <Select
      className="selector"
      closeMenuOnSelect={closeMenuOnSelect}
      isClearable={isClearable}
      placeholder={placeholder}
      isSearchable={isSearchable}
      options={options}
      isMulti={isMulti}
      name={name}
      ref={selectRef}
      onChange={onChange}
      value={value}
      noOptionsMessage={(): null => null}
    />
  );
};

export default MySelector;
