import React, { HTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';

interface Props {
	isClearable?: boolean;
	onChange?: (date: Date) => any;
	selectedDate: Date | undefined;
	minDate?: Date;
	inline?: boolean;
	showPopperArrow?: boolean;
	disabled?: boolean
}

const DatePicker = ({
	selectedDate,
	onChange,
	isClearable = false,
	showPopperArrow = false,
	...props
}: Props /*& HTMLAttributes<HTMLElement>*/) => {
	return (
		<ReactDatePicker
			selected={selectedDate}
			onChange={onChange}
			isClearable={isClearable}
			showPopperArrow={showPopperArrow}
			dateFormat="dd/MM/yyyy HH:mm"
			showTimeInput
			{...props}
		/>
	);
};

export default DatePicker;