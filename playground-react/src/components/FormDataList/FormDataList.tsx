import {useFormContext} from "../../contexts/FormContext";
import styles from './FormDataList.module.css';
import FormDataListItem from "../FormDataListItem/FormDataListItem";
import {ChangeEvent, useId, useMemo, useState} from "react";

const FormDataList = () => {
  const {state, dispatch} = useFormContext();
  const [term, setTerm] = useState('');
  const {formDataItems} = state;

  // const sortedFormDataItems = [...formDataItems].sort((a, b) => b.age - a.age);
  // const filteredFormDataItems = sortedFormDataItems.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));

  const sortedFormDataItems = useMemo(() => {
    return [...formDataItems].sort((a, b) => b.age - a.age);
  }, [formDataItems]);

  const filteredFormDataItems = useMemo(() => {
    return sortedFormDataItems.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
  }, [sortedFormDataItems, term]);

  return (
    <div>
      <h2>Form Data List</h2>
      <form>
        <label>Search for name</label>
        <input
          id={useId() + 'search'}
          type={'text'}
          value={term}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value)}
        />
      </form>
      <ul className={styles.formListContainer}>
        {filteredFormDataItems.map((item, index) => (
          <li key={index}>
            <FormDataListItem formData={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDataList;
