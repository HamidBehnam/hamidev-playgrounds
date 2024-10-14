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
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [term, setTerm] = useState<string>('');

  const tagChangeHandler = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(tagItem => tagItem !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const deleteTagHandler = (tag: Tag) => {
    setSelectedTags(selectedTags.filter(tagItem => tagItem !== tag));
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
        {selectedTags.map((tagItem, index) => (
          <div key={tagItem.id} className={styles.tagItem}>
            <div>
              {tagItem.title}
            </div>
            <button onClick={() => deleteTagHandler(tagItem)}>X</button>
          </div>
        ))}
        <input type={'text'} value={term} onChange={(event) => setTerm(event.target.value)}/>
      </div>
      <form>
        {tags && tags.map(tag => (
          <div key={tag.id}>
            <label>
              <input type={'checkbox'} name={'tags'} value={tag.title} checked={selectedTags.includes(tag)} onChange={() => tagChangeHandler(tag)} />
              {tag.title}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default TagManager;
