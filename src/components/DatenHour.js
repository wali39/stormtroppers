import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'react-bootstrap';

const DatenHour = ({ selectedDate, handleDateChange }) => {

    return (
        <div>

            <Form.Group>
                <label style={{ color: 'black', marginRight: "5px" }}>Select date and hour:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH"
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:00:00 aa"
                    className="form-control"
                />
            </Form.Group>
        </div>
    );
}

export default DatenHour;
