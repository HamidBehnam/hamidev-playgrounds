import {useEffect, useState} from "react";
import styles from './TagManager.module.css';

interface Tag {
  id: string;
  title: string;
}

const tagsData: Tag[] = [
  {id: "1", title: "Joy Smith"},
  {id: "2", title: "James Beardman"},
  {id: "3", title: "Suzanne Brecker"},
  {id: "4", title: "Fredrick Durst"},
];

const TagManager = () => {
  const [tags, setTags] = useState<Tag[]>(tagsData);
  const [selectedTags, setSelectedTags] = useState(new Map<string, Tag>());
  const [term, setTerm] = useState<string>('');

  const tagChangeHandler = (tag: Tag) => {
    let selectedTagsCopy = new Map(selectedTags);

    if (selectedTags.has(tag.id)) {
      selectedTagsCopy.delete(tag.id);
    } else {
      selectedTagsCopy.set(tag.id, tag);
    }

    setSelectedTags(selectedTagsCopy);
  };

  const deleteTagHandler = (tag: Tag) => {
    let selectedTagsCopy = new Map(selectedTags);
    selectedTagsCopy.delete(tag.id);
    setSelectedTags(selectedTagsCopy);
  };

  useEffect(() => {
    const formattedTerm = term.trim().toLowerCase();

    if (formattedTerm) {
      setTags(tagsData.filter(tag => tag.title.toLowerCase().includes(formattedTerm)));
    } else {
      setTags(tagsData);
    }
  }, [term]);

  return (
    <div>
      <div className={styles.tagsContainer}>
        {Array.from(selectedTags).map(([tagId, tag], index) => (
          <div key={tagId} className={styles.tagItem}>
            <div>
              {tag.title}
            </div>
            <button onClick={() => deleteTagHandler(tag)}>X</button>
          </div>
        ))}
        <input type={'text'} value={term} onChange={(event) => setTerm(event.target.value)}/>
      </div>
      <form>
        {tags && tags.map(tag => (
          <div key={tag.id}>
            <label>
              <input type={'checkbox'} name={'tags'} value={tag.title} checked={selectedTags.has(tag.id)} onChange={() => tagChangeHandler(tag)} />
              {tag.title}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default TagManager;
