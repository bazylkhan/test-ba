// DropdownComponent.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

function DropdownComponent({ filter, multiple, options, label }) {
    const [selected, setSelected] = React.useState(multiple ? [] : '');

    const handleChange = (event) => {
        const value = multiple ? event.target.value : event.target.value;
        setSelected(value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple={multiple}
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => multiple ? selected.join(', ') : selected}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {multiple && <Checkbox checked={selected.indexOf(option.value) > -1} />}
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default DropdownComponent;
