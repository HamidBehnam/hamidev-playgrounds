import {FC} from "react";
import {Tag} from "@/app/_components/TagManager/TagManager";

interface TagListProps {
  tags: Tag[];
  selectedTags: Set<number>;
  onToggle: (tag: Tag) => void;
}

const TagList: FC<TagListProps> = ({tags, selectedTags, onToggle}) => {
  return (
    <ul className={'flex flex-col gap-y-2'}>
      {tags.map(tag => (
        <li key={tag.id} className={'flex gap-x-2 items-center'}>
          <input
            id={`${tag.id}`}
            name={'tag'}
            type={'checkbox'}
            value={tag.title}
            checked={selectedTags.has(tag.id)}
            onChange={() => onToggle(tag)}
          />
          <label htmlFor={`${tag.id}`}>{tag.title}</label>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
