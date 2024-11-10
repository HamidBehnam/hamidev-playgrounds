import {FC} from "react";
import {FormData} from "../../contexts/FormContext";
import styles from './FormDataListItem.module.css';

interface FormDataListItemProps {
  formData: FormData;
}

const FormDataListItem: FC<FormDataListItemProps> = ({formData}) => {
  return (
    <div className={styles.formListItemContainer}>
      <section>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Message: {formData.message}</p>
      </section>
      <section>
        <p>Age: {formData.age}</p>
        {formData.age >= 20 && (
          <>
            <p>Departure: {formData.departure}</p>
            <p>Arrival: {formData.arrival}</p>
          </>
        )}
      </section>
      <section>
        <p>Terms accepted: {formData.accept ? 'Yes' : 'No'}</p>
        <p>Tags: {formData.tags.join(', ')}</p>
        <p>Radio: {formData.radio}</p>
        <p>Option: {formData.option}</p>
      </section>
    </div>
  );
};

export default FormDataListItem;
