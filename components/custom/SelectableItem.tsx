import { cx } from "class-variance-authority";
import React from "react";

type Props = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};
const SelectableItem = ({ text, isSelected, onClick }: Props) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cx(
        "px-4 py-2 rounded-md transition-all duration-200 border-2 text-center cursor-pointer hover:bg-slate-50 select-none align-middle",
        isSelected ? "border-slate-700 font-bold" : "border-slate-100"
      )}
    >
      {text}
    </div>
  );
};

export default SelectableItem;
