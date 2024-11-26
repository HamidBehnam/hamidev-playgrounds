import {useAppContext} from "../../providers/AppProvider";
import {FC, useEffect, useState} from "react";
import {AppAction, PermissionOption} from "../../types";

interface PermissionSelectorProps {
  options: PermissionOption[];
}

const PermissionSelector: FC<PermissionSelectorProps> = ({options}) => {
  const {state, dispatch} = useAppContext();
  const [selectedPermissions, setSelectedPermissions] = useState(new Set<string>([]));

  useEffect(() => {
    setSelectedPermissions(
      state.filterData.inclusionType === 'INCLUDE' ?
        new Set(state.filterData.includedPermissions) :
        new Set(state.filterData.excludedPermissions)
    );
  }, [state.filterData.inclusionType, state.filterData.includedPermissions, state.filterData.excludedPermissions]);

  const handleInclusionTypeChange = (action: AppAction) => {
    console.log(action);
    dispatch(action);
    dispatch({type: 'SET_USER_INTERVENED', payload: true});
  };

  const handlePermissionChange = (option: PermissionOption) => {
    const selectedPermissionsCloned = new Set(selectedPermissions);
    if (selectedPermissionsCloned.has(option.value)) {
      selectedPermissionsCloned.delete(option.value);
    } else {
      selectedPermissionsCloned.add(option.value);
    }

    setSelectedPermissions(selectedPermissionsCloned);

    if (state.filterData.inclusionType === 'INCLUDE') {
      dispatch({type: 'SET_INCLUDED_PERMISSIONS', payload: Array.from(selectedPermissionsCloned)});
    } else {
      dispatch({type: 'SET_EXCLUDED_PERMISSIONS', payload: Array.from(selectedPermissionsCloned)});
    }

    dispatch({ type: "SET_USER_INTERVENED", payload: true});
  };

  return (
    <form className={'flex gap-2'}>
      <div>
        <label>
          <input
            type={'radio'}
            value={'INCLUDE'}
            checked={state.filterData.inclusionType === 'INCLUDE'}
            onChange={() => handleInclusionTypeChange({type: 'SET_INCLUSION', payload: 'INCLUDE'})}
          />
          Include
        </label>
      </div>
      <div>
        <label>
          <input
            type={'radio'}
            value={'EXCLUDE'}
            checked={state.filterData.inclusionType === 'EXCLUDE'}
            onChange={() => handleInclusionTypeChange({type: 'SET_INCLUSION', payload: 'EXCLUDE'})}
          />
          Exclude
        </label>
      </div>
      <div>
        {options.map(option => (
          <label key={option.value}>
            <input
              type={'checkbox'}
              value={option.value}
              checked={selectedPermissions.has(option.value)}
              onChange={() => handlePermissionChange(option)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </form>
  );
};

export default PermissionSelector;
