import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

// Redux
import { deletePosts } from './../actions/index';
import { useSelector, useDispatch } from 'react-redux';

// UI Components
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Skeleton from '@material-ui/lab/Skeleton';

const Post = (props) => {

    const {id, name, description} = props.post;
    const {skeleton, index} = props;

    // Hooks
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleCloseDialogNotOpction = () => {
        setDialogOpen(false);
    };

    const handleCloseDialogYesOpction = () => {
        setDialogOpen(false);
        dispatch(deletePosts({
            id
        }));
    };

    const isDeleting = useSelector(state => state.isDeleting);

    const isDeletingComponent = isDeleting.isDeleting &&  isDeleting.idDeleting === id;
    const dispatch = useDispatch();

    const onClick = (e) =>{
        handleClickOpen();
    };

    return (
        <TableRow key={id} style={index % 2? {background: '#EAE5FF'}: {background: '#FFF'}}>
            <TableCell align="left">
                {
                    skeleton?(
                        <Skeleton variant="text"/>
                    ):
                    (
                        name
                    )
                }
            </TableCell>
            <TableCell align="left">
                {
                    skeleton?(
                        <Skeleton variant="text"/>
                    ):
                    (
                        description
                    )
                }
            </TableCell>
            <TableCell align="center">
                {
                    skeleton?(
                        <Skeleton variant="text"/>
                    ):
                    (
                        <Button
                            onClick={onClick}
                            variant="contained"
                            color={isDeletingComponent?"default":"secondary"}
                            disabled={isDeletingComponent}
                            startIcon={<DeleteIcon />}
                        >
                            {
                                isDeletingComponent?
                                (<CircularProgress size={24}/>):
                                "Eliminar"
                                }
                            
                        </Button>
                    )
                }

               
                <Dialog
                    key={id}
                    open={dialogOpen}
                    keepMounted
                    onClose={handleCloseDialogNotOpction}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Aviso"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            isDeleting.isDeleting?
                            "Espera la eliminacion del Post antes de eliminar otro":
                            `Esta seguro de Eliminar el Post (${id}) ${name}?`
                        }
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                    {isDeleting.isDeleting?
                    ( 
                        <Button onClick={handleCloseDialogNotOpction} color="primary">
                        ACEPTAR
                    </Button>
                    ):
                    (
                        <Fragment>
                            <Button onClick={handleCloseDialogYesOpction} color="primary">
                                Si
                            </Button>
                            <Button onClick={handleCloseDialogNotOpction} color="primary">
                                NO
                            </Button>
                        </Fragment>
                        
                    )
                    }
                    </DialogActions>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

Post.propTypes  = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string
};

export default Post;