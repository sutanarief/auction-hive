'use client'

import { IconType } from "react-icons";

type ItemCategoryProps = {
  icon: IconType;
  label: string;
  description: string;
}

const ItemCategory:React.FC<ItemCategoryProps> = ({
  icon: Icon,
  label,
  description
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col w-4/5">
          <div className="text-lg font-semibold">
            {label}
          </div>
          <div className="text-neutral-500 font-light">
            {description}
          </div>
        </div>
        <Icon size={40} className="text-neutral-600" />
      </div>

    </div>
  );
}
 
export default ItemCategory;