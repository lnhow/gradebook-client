import { FormControl, InputLabel, OutlinedInput, FormHelperText } from "@mui/material"

export default function CustomTextField({
  id, label, autoFocus, disabled,
  fullWidth, margin='dense', error=false, 
  type, value, onChange,
  endAdornment,
  helperText
}) {
  return (
    <FormControl 
      fullWidth={fullWidth} 
      margin={margin} 
      variant='outlined'
      disabled={disabled}
      error={error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
        endAdornment={endAdornment}
        label={label}
      />
      <FormHelperText>
        {/* Make helpertext's height fixed */}
        {helperText || ' '}
      </FormHelperText>
    </FormControl>
  )
}
