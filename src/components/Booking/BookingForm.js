import React, {Fragment, useReducer, useState} from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const defaultDate = new Date('2022-12-31T00:00:00'); 
const initialFormState = {
            name: '',
            email: '',
            address: '',
            telephone: '',
            datePickerValue: defaultDate,
            zip: ''
    }

export const BookingForm = props => {

    const formStateReducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_INPUT':
                return{
                    ...state,
                    [action.field]: action.payload,
                };
                break;
                default:
                return state;
        }
    };

    const [bookingFormState, dispatch] = useReducer(formStateReducer, initialFormState)

    const inputChangeHandler = e => {
        dispatch({
            type: 'UPDATE_INPUT',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const datePickerChangeHandler = date => {
        dispatch({
            type: 'UPDATE_INPUT',
            field: 'datePickerValue',
            payload: date
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(bookingFormState)
        let payload;
        Object.keys(bookingFormState).forEach(key => {
            key === 'datePickerValue' ? payload = defaultDate : payload = ''
            dispatch ({
                type: 'UPDATE_INPUT',
                field: key,
                payload: payload
            })
        });
    }

    return <Fragment>
        
            <Typography  gutterBottom variant="h5" align="center">
                Book Appointment
            </Typography>
            <Grid container xs={12} sm={3} spacing={1} item>
            <Card>
                <CardContent>
                    <form aria-label="booking-details-form" onSubmit={formSubmitHandler}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField minLength={3} value={bookingFormState.name} data-testid="className" name="name" variant="outlined" type="text" label="Full Name" placeholder="Enter Full Name" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={bookingFormState.email} name="email" variant="outlined" label="Email" type="email" placeholder="Enter email" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={bookingFormState.telephone} type="telephone" name="telephone" variant="outlined" label="Phone Number" placeholder="Enter Phone #" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={bookingFormState.address} type="text" name="address" variant="outlined" label="Address" placeholder="Street address, city and state" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={bookingFormState.zip} type="text" pattern="[0-9]*" name="zip" variant="outlined" label="Zip Code" placeholder="Enter zipcode" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    name="datePickerValue"
                                    renderInput={(props) => <TextField {...props} />}
                                    label="DateTimePicker"
                                    value={bookingFormState.datePickerValue}
                                    onChange={(newValue) => {
                                        datePickerChangeHandler(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type="submit" variant="contained" color="primary" fullWidth={false}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            </Grid>
        </Fragment>
}
