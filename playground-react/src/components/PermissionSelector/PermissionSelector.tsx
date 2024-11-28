import {FC, useEffect, useState} from "react";
import useAppStore from "../../hooks/useAppStore";
import {PermissionOption} from "../../types";

interface PermissionSelectorProps {
  options: PermissionOption[];
}

const PermissionSelector: FC<PermissionSelectorProps> = ({options}) => {
  const {
    filterData: {
      inclusionType,
      includedPermissions,
      excludedPermissions
    },
    setInclusion,
    setIncludedPermissions,
    setExcludedPermissions,
    setUserIntervened
  } = useAppStore(state => state);

  const [selectedPermissions, setSelectedPermissions] = useState(new Set<string>([]));

  useEffect(() => {
    setSelectedPermissions(
      inclusionType === 'INCLUDE' ?
        new Set(includedPermissions) :
        new Set(excludedPermissions)
    );
  }, [inclusionType, includedPermissions, excludedPermissions]);

  const handleInclusionTypeChange = (type: 'INCLUDE' | 'EXCLUDE') => {
    setInclusion(type);
    setUserIntervened(true);
  };

  const handlePermissionChange = (option: PermissionOption) => {
    const selectedPermissionsCloned = new Set(selectedPermissions);
    if (selectedPermissionsCloned.has(option.value)) {
      selectedPermissionsCloned.delete(option.value);
    } else {
      selectedPermissionsCloned.add(option.value);
    }

    setSelectedPermissions(selectedPermissionsCloned);

    if (inclusionType === 'INCLUDE') {
      setIncludedPermissions(Array.from(selectedPermissionsCloned));
    } else {
      setExcludedPermissions(Array.from(selectedPermissionsCloned));
    }

    setUserIntervened(true);
  };

  return (
    <form className={'flex gap-2'}>
      <div>
        <label>
          <input
            type={'radio'}
            value={'INCLUDE'}
            checked={inclusionType === 'INCLUDE'}
            onChange={() => handleInclusionTypeChange('INCLUDE')}
          />
          Include
        </label>
      </div>
      <div>
        <label>
          <input
            type={'radio'}
            value={'EXCLUDE'}
            checked={inclusionType === 'EXCLUDE'}
            onChange={() => handleInclusionTypeChange('EXCLUDE')}
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
