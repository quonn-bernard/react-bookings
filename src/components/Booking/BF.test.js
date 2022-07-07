import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { BookingForm } from '../Booking/BookingForm';

describe('Form is being rendered', () => {
    
    test('form is rendered', () => {
        render(<BookingForm />)
        const bookingForm = screen.getByLabelText('booking-details-form')
        expect(bookingForm).toBeInTheDocument();
    })

    test('Form renders 6 input elements (full name, email, address, telephone, zipcode, and date/time picker) and 1 button', () => {
    
        const {getByRole} = render(<BookingForm />)
        
        expect(getByRole('textbox', {name: /full name/i})).toBeInTheDocument();
        expect(getByRole('textbox', {name: /email/i})).toBeInTheDocument();
        expect(getByRole('textbox', {name: /phone number/i})).toBeInTheDocument()
        expect(getByRole('textbox', {name: /address/i})).toBeInTheDocument()
        expect(getByRole('textbox', {name: /zip code/i})).toBeInTheDocument()
        expect(getByRole('textbox', {name: /choose date, selected date is dec 31, 2022/i}))
        expect(getByRole('button', {name: /submit/i})).toBeInTheDocument()
    
    })

    test('Form captures and forwards user input correctly', () => {
    
        render(<BookingForm />)
        

        const nameInput = screen.getByRole('textbox', {name: /full name/i})
        const emailInput = screen.getByRole('textbox', {name: /email/i})
        const expectedNameInputValue = 'Quonn'
        const expectedEmailInputValue = 'qber83@gmail.com'

        fireEvent.change(nameInput, {target: {value: 'Quonn'}})
        fireEvent.change(emailInput, {target: {value: 'qber83@gmail.com'}})

        // fireEvent.click(button)
        // expect(getByRole('textbox', {name: /full name/i})).toBeInTheDocument();
        // expect(getByRole('textbox', {name: /email/i})).toBeInTheDocument();
        // expect(getByRole('textbox', {name: /phone number/i})).toBeInTheDocument()
        // expect(getByRole('textbox', {name: /address/i})).toBeInTheDocument()
        // expect(getByRole('textbox', {name: /zip code/i})).toBeInTheDocument()
        // expect(getByRole('textbox', {name: /choose date, selected date is dec 31, 2022/i}))
        // expect(getByRole('button', {name: /submit/i})).toBeInTheDocument()

        expect(nameInput.value).toEqual(expectedNameInputValue)
        expect(nameInput.value.length).toBeGreaterThanOrEqual(3)
        expect(emailInput.value).toEqual(expectedEmailInputValue)
        expect(emailInput.value).toContain('@')
        expect(emailInput.value).toContain('.com')

    
    })
})


