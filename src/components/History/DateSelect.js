import { Fragment, useRef } from 'react';

import classes from './DateSelect.module.css';

const DateSelect = (props) => {
	const selectRef = useRef();

	const monthChangeHandler = () => {
		props.selectedValHandler(
			selectRef.current.options[selectRef.current.selectedIndex].value
		);
	};

	const dayChangeHandler = () => {
		props.selectedValHandler(
			selectRef.current.options[selectRef.current.selectedIndex].text
		);
	};

	const yearChangeHandler = () => {
		props.selectedValHandler(
			selectRef.current.options[selectRef.current.selectedIndex].text
		);
	};

	const daySelectElement = (
		<select
			className={classes.selects}
			defaultValue=''
			ref={selectRef}
			name='day-options'
			onChange={dayChangeHandler}>
			<option value='' disabled>
				Day...
			</option>
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
			<option>6</option>
			<option>7</option>
			<option>8</option>
			<option>9</option>
			<option>10</option>
			<option>11</option>
			<option>12</option>
			<option>13</option>
			<option>14</option>
			<option>15</option>
			<option>16</option>
			<option>17</option>
			<option>18</option>
			<option>19</option>
			<option>20</option>
			<option>21</option>
			<option>22</option>
			<option>23</option>
			<option>24</option>
			<option>25</option>
			<option>26</option>
			<option>27</option>
			<option>28</option>
			<option>29</option>
			<option>30</option>
			<option>31</option>
		</select>
	);

	const monthSelectElement = (
		<select
			className={classes.selects}
			defaultValue=''
			ref={selectRef}
			name='month-options'
			onChange={monthChangeHandler}>
			<option value='' disabled>
				Month...
			</option>
			<option value='1'>Jan</option>
			<option value='2'>Feb</option>
			<option value='3'>Mar</option>
			<option value='4'>Apr</option>
			<option value='5'>May</option>
			<option value='6'>Jun</option>
			<option value='7'>Jul</option>
			<option value='8'>Aug</option>
			<option value='9'>Sep</option>
			<option value='10'>Oct</option>
			<option value='11'>Nov</option>
			<option value='12'>Dec</option>
		</select>
	);

	const yearSelectElement = (
		<select
			className={classes.selects}
			defaultValue=''
			ref={selectRef}
			name='year-options'
			onChange={yearChangeHandler}>
			<option value='' disabled>
				Year...
			</option>
			<option>2020</option>
			<option>2021</option>
		</select>
	);

	let selectElement;

	if (props.day) {
		selectElement = daySelectElement;
	} else if (props.month) {
		selectElement = monthSelectElement;
	} else if (props.year) {
		selectElement = yearSelectElement;
	} else {
		selectElement = <p>Invalid DateSelect</p>;
	}

	return <Fragment>{selectElement}</Fragment>;
};

export default DateSelect;
