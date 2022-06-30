import classes from './App.module.scss';
import { BookingForm } from './components/Booking/BookingForm';

export const App = () => {
  return (
    <div className={classes.App}>
      <BookingForm />    
    </div>
  );
}

