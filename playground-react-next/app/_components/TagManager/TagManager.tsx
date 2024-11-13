"use client";

import { useState } from "react";
import TagForm from "@/app/_components/TagForm/TagForm";
import TagList from "@/app/_components/TagList/TagList";

export interface Tag {
  id: number;
  title: string;
}

const tagsData = [
  {
    id: 1,
    title: 'Tag 1'
  },
  {
    id: 2,
    title: 'Tag 2'
  },
  {
    id: 3,
    title: 'Tag 3'
  },
  {
    id: 4,
    title: 'Tag 4'
  }
];

const TagManager = () => {
  const [tags, setTags] = useState<Tag[]>(tagsData);

  const [selectedTags, setSelectedTags] = useState(new Map<number, Tag>());

  const toggleTag = (tag: Tag) => {
    const selectedTagsClone = new Map(selectedTags);

    if (selectedTagsClone.has(tag.id)) {
      selectedTagsClone.delete(tag.id);
    } else {
      selectedTagsClone.set(tag.id, tag);
    }

    setSelectedTags(selectedTagsClone);
  };

  const deleteSelection = (tag: Tag) => {
    const selectedTagsClone = new Map(selectedTags);

    selectedTagsClone.delete(tag.id);

    setSelectedTags(selectedTagsClone);
  };

  const filterTags = (filter: string) => {
    if (filter.trim()) {
      setTags(tagsData.filter(tag => tag.title.toLowerCase().includes(filter.toLowerCase())));
    } else {
      setTags(tagsData);
    }
  };

  return (
    <div className={'max-w-md mx-auto bg-white shadow-xl rounded-lg p-5 mt-14'}>
      <h1 className={'font-bold text-xl'}>Tag Manager App</h1>
      <TagForm selectedTags={selectedTags} onDelete={deleteSelection} onFilter={filterTags}/>
      <TagList tags={tags} selectedTags={selectedTags} onToggle={toggleTag}/>
    </div>
  );
};

export default TagManager;
