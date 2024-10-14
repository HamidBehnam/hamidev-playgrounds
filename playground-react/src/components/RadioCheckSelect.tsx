import {FC, useState} from "react";

interface Item {
  id: string;
  label: string;
  value: string;
}

const radioItemsSource: Item[] = [
    {id: 'radio1', label: 'Radio 1', value: 'radio1'},
    {id: 'radio2', label: 'Radio 2', value: 'radio2'},
    {id: 'radio3', label: 'Radio 3', value: 'radio3'},
];

const checkItemsSource: Item[] = [
    {id: 'check1', label: 'Check 1', value: 'check1'},
    {id: 'check2', label: 'Check 2', value: 'check2'},
    {id: 'check3', label: 'Check 3', value: 'check3'},
];

const selectItemsSource: Item[] = [
    {id: 'select1', label: 'Select 1', value: 'select1'},
    {id: 'select2', label: 'Select 2', value: 'select2'},
    {id: 'select3', label: 'Select 3', value: 'select3'},
];

const RadioCheckSelect: FC = () => {
  const [radioItems, setRadioItems] = useState<Item[]>(radioItemsSource);
  const [checkItems, setCheckItems] = useState<Item[]>(checkItemsSource);
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const [selectedCheck, setSelectedCheck] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const radioChangeHandler = (item: Item) => {
    setSelectedRadio(item.value);

    // TODO: If you don't have the dynamic item object, you can use the event object to get the value of the radio button:
    // setSelectedRadio(event.target.value);
  };

  const checkChangeHandler = (item: Item) => {
    if (selectedCheck.includes(item.value)) {
      setSelectedCheck(selectedCheck.filter(value => value !== item.value));
    } else {
      setSelectedCheck([...selectedCheck, item.value]);
    }

    // TODO: If you don't have the dynamic item object, you can use the event object to get the value of the checkbox:
    // setSelectedCheck([...selectedCheck, event.target.value ]);
    // and to see if the checkbox is checked:
    // event.target.checked
  };

  return (
    <div>
      <form>
        <h3>Radio Buttons:</h3>
        {radioItems.map(item => (
          <div key={item.id}>
            <label>
              <input type={'radio'} name={'radio'} value={item.value} checked={item.value === selectedRadio} onChange={() => radioChangeHandler(item)} />
              {item.label}
            </label>
          </div>
        ))}
        <h3>Selected Radio Item:</h3>
        <h4>{selectedRadio}</h4>
        <hr />
        <h3>Checkboxes:</h3>
        {checkItems.map(item => (
          <div key={item.id}>
            <label>
              <input type={'checkbox'} name={'check'} value={item.value} checked={selectedCheck.includes(item.value)} onChange={() => checkChangeHandler(item)} />
              {item.label}
            </label>
          </div>
        ))}
        <h3>Selected Check Items:</h3>
        <h4>{selectedCheck.join(', ')}</h4>
        <hr />
        <h3>Select:</h3>
        <select value={selectedOption} onChange={event => setSelectedOption(event.target.value)}>
          <option value={''}>Select an option</option>
          {selectItemsSource.map(item => (
            <option key={item.id} value={item.value}>{item.label}</option>
          ))}
        </select>
        <h3>Selected Option:</h3>
        <h4>{selectedOption}</h4>
      </form>
    </div>
  );
}

export default RadioCheckSelect;
