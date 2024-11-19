import React from "react";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard: React.FC<Props> = ({
  _id,
  name,
  questions = 0,
  showCount = false,
  compact = false,
  remove = false,
  isButton = false,
  handleRemove,
}) => {
  const iconClass = getDeviconClassName(name) || "default-icon";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  // Non-compact mode fallback
  return (
    <div className="tag-card-wrapper">
      <Link href={ROUTES.TAGS(_id)}>
        <div className="flex items-center gap-4">{Content}</div>
      </Link>
    </div>
  );
};

export default TagCard;


