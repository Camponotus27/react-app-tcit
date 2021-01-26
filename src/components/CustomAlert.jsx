import React, { useState } from 'react';


// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeError } from './../actions/index';

// UI Components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CustomAlert = () => {

    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const funcionTest = () => {
        console.log(alert);

        if(alert.message !== ''){
            setOpen(true);
            dispatch(removeError());
        }
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.severity}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
};


export default CustomAlert;