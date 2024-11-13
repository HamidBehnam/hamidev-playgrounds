import { FC, useEffect, useId, useState } from "react";
import { Tag } from "../TagManager/TagManager";

interface TagFormProps {
  selectedTags: Set<number>,
  tags: Tag[],
  onDelete: (tag: Tag) => void,
  onFilter: (filter: string) => void,
}

const TagForm: FC<TagFormProps> = ({tags, selectedTags, onDelete, onFilter}) => {
  const uniqueId = useId();
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    onFilter(filterTag);
  }, [filterTag]);

  return (
    <>
      <div className={'flex gap-x-2 mt-4'}>
        {tags.filter(tag => selectedTags.has(tag.id)).map(tag => (
          <div key={tag.id} className={'flex gap-x-2 bg-gray-300 rounded-xl p-2'}>
            <div>{tag.title}</div>
            <button onClick={() => onDelete(tag)}>X</button>
          </div>
        ))}
      </div>
      <form>
        <input
          id={`${uniqueId}-tag-input`}
          type={'text'}
          name={'tag-input'}
          value={filterTag}
          onChange={(event) => setFilterTag(event.target.value)}
          className={'border-2 w-full my-5'}
        />
      </form>
    </>
  );
};

export default TagForm;
