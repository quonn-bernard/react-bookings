import React, {Fragment, useRef, useState, useReducer} from 'react';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

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

    const [appointmentFormState, dispatch] = useReducer(formStateReducer, initialFormState)

    const inputChangeHandler = e => {
        dispatch({
            type: 'UPDATE_INPUT',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const datePickerChangeHandler = date => {
        console.log(date)
        dispatch({
            type: 'UPDATE_INPUT',
            field: 'datePickerValue',
            payload: date
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(appointmentFormState)
        let payload;
        Object.keys(appointmentFormState).forEach(key => {
            key === 'datePickerValue' ? payload = defaultDate : payload = ''
            dispatch ({
                type: 'UPDATE_INPUT',
                field: key,
                payload: payload
            })
        });
        console.log(appointmentFormState)
    }

    return <Fragment>
            <Typography  gutterBottom variant="h5" align="center">
                Book Appointment
            </Typography>
            <Grid container xs={12} sm={3} spacing={1} item>
            <Card>
                <CardContent>
                    <form onSubmit={formSubmitHandler}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField value={appointmentFormState.name} name="name" variant="outlined" type="text" label="Full Name" placeholder="Enter Full Name" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={appointmentFormState.email} name="email" variant="outlined" label="Email" type="email" placeholder="Enter email" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={appointmentFormState.telephone} name="telephone" variant="outlined" label="Phone Number" placeholder="Enter Phone #" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={appointmentFormState.address} name="address" variant="outlined" label="Address" placeholder="Street address, city and state" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField value={appointmentFormState.zip} name="zip" variant="outlined" label="Zip Code" placeholder="Enter zipcode" fullWidth required onChange={(e)=>{inputChangeHandler(e)}}/>
                            </Grid>
                            <Grid xs={12} item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    name="datePickerValue"
                                    renderInput={(props) => <TextField {...props} />}
                                    label="DateTimePicker"
                                    value={appointmentFormState.datePickerValue}
                                    onChange={(newValue) => {
                                        datePickerChangeHandler(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            </Grid>
        </Fragment>
}
