import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'react-bootstrap';


const DateComponent = ({ selectedDate, handleDateChange }) => {

    return (
        <div>

            <Form.Group>
                <label style={{ color: 'black', marginRight: "5px" }}>Select date and hour:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}



                    className="form-control"
                />
            </Form.Group>
        </div>
    );
}

export default DateComponent;
