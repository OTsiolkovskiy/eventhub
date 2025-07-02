import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type SelectFieldProps = {
  label: string;
  placeholder: string;
  value: string | undefined;
  options: string[];
  onChange: (value: string) => void;
}

export const SelectField = ({ label, placeholder, value, options, onChange }: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1">
        {label}
      </Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='none'>None</SelectItem>
          {options.map((loc: string) => {
            return (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}