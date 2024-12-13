import {
  Button,
  ButtonGroup,
  Divider,
  FormControlLabel,
  Menu,
  Checkbox,
  FormGroup,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { FC, useState, useEffect } from "react";
import * as R from "ramda";
import { inclusionTypes } from "../../constants";
import {AppState, PermissionOption} from "../../types";
import useAppStore from "../../hooks/useAppStore";

interface MenuFilterProps {
  options?: PermissionOption[];
  label: string;
}

export const MenuFilter: FC<MenuFilterProps> = ({ options = [], label }) => {
  const {
    filterData: {
      inclusionType,
      includedPermissions,
      excludedPermissions
    },
    setIncludedPermissions,
    setExcludedPermissions,
    setUserIntervened,
    setResetSignal,
  } = useAppStore((state: AppState) => state);
  const [selectedPermissions, setSelectedPermissions] = useState(new Set<string>([]));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedPermissions(
      inclusionType === 'INCLUDE' ? 
      new Set(includedPermissions) : 
      new Set(excludedPermissions)
    );
  }, [inclusionType, includedPermissions, excludedPermissions]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    setResetSignal(false);
  };

  return (
    <>
      <Button onClick={handleClick}>
        {label} <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 0.5 }}
      >
        <IncludeExcludeToggle />
        <Divider sx={{ my: 0.5 }} />
        <FormGroup>
          {R.map(
            (option) => (
              <FormControlLabel
                key={option?.value}
                control={<Checkbox checked={selectedPermissions.has(option.value)} onChange={() => handlePermissionChange(option)} />}
                label={option?.label}
                sx={{ paddingLeft: "16px" }}
              />
            ),
            options
          )}
        </FormGroup>
      </Menu>
    </>
  );
};

const IncludeExcludeToggle = () => {
  const {
    filterData: {
      inclusionType
    },
    setInclusion,
    setUserIntervened
  } = useAppStore((state: AppState) => state);
  
  const handleInclusionTypeChange = (inclusionType: 'INCLUDE' | 'EXCLUDE') => {
    setInclusion(inclusionType);
    setUserIntervened(true);
  };

  return (
    <ButtonGroup size="small" sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
      <Button
        onClick={() => handleInclusionTypeChange('INCLUDE')}
        variant={
          inclusionType === inclusionTypes.INCLUDE ? "contained" : "outlined"
        }
      >
        Include
      </Button>
      <Button
        onClick={() => handleInclusionTypeChange('EXCLUDE')}
        variant={
          inclusionType === inclusionTypes.EXCLUDE ? "contained" : "outlined"
        }
      >
        Exclude
      </Button>
    </ButtonGroup>
  );
};
