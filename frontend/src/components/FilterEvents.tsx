import { SelectField } from "./SelectField"
import { DatePickerWithClear } from "./DatePickerWithClear"

type FilterEventsProps = {
  locationData: { events: { location: string }[] };
  location: string;
  onLocationChange: (value: string) => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
  onStatusChange: (value: string) => void;
  eventStatus: string | undefined;
}

export const FilterEvents = ({
  locationData,
  location,
  onLocationChange,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onStatusChange,
  eventStatus
}: FilterEventsProps) => {

  const uniqueLocations: string[] = Array.from(
    new Set(locationData?.events.map((event: { location: string }) => event.location))
  );

  const statuses = ['scheduled', 'cancelled', 'completed'];

  return (
    <div className='flex flex-col lg:flex-row gap-2'>

      <SelectField
        label='Location'
        placeholder='Select a location'
        value={location}
        options={uniqueLocations}
        onChange={onLocationChange}
      />

      <DatePickerWithClear
        label="Date from"
        date={dateFrom}
        setDate={setDateFrom}
      />

      <DatePickerWithClear
        label="Date to"
        date={dateTo}
        setDate={setDateTo}
      />

      <SelectField
        label='Status'
        placeholder='Select status'
        value={eventStatus}
        options={statuses}
        onChange={onStatusChange}
      />
    </div>
  )
}