import React from 'react';

// Hook Form
import { useForm, Controller } from 'react-hook-form';

// Redux
import { addPosts } from './../actions/index';
import { useSelector, useDispatch } from 'react-redux';

// UI components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';


const FormPost = () => {


    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();

    
    // estilos
    const formStyle = {
        marginTop: 40,
        width: '100%'
    }

    const textFieldStyle = {
    }

    const gridStyle = {
        marginBottom: 100
    }

    const buttonStyle = {
        marginRight: 20,
        minWidth: 100
    }
  
    // hooks
 
    const isCreating = useSelector(state => state.isCreating);
    const isFetching = useSelector(state => state.isFetching);

    const dispatch = useDispatch();
    
    // funciones
    const onSubmit = (data, e) =>{

        dispatch(addPosts(data));
        reset();
    };

    return (
            <form
            onSubmit={handleSubmit(onSubmit)}
            style={formStyle} 
            autoComplete="off"
            >
                <Grid
                    style={gridStyle}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="baseline"
                    spacing={2}
                    >
                   <Grid 
                        container 
                        item 
                        xs={12} 
                        md={4}
                   >
                    <FormControl fullWidth variant="outlined">
                        <Controller
                            name="name"
                            as={
                                <TextField
                                name="name"
                                style={textFieldStyle}
                                label="Nombre"
                                variant="outlined"
                                error={fieldsErrors.name?true:false}
                                helperText={fieldsErrors.name?"Campo requerido.":""}
                            />
                            }
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required'
                            }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid 
                        container 
                        item 
                        xs={12} 
                        md={6}
                    >      
                    <FormControl fullWidth variant="outlined">
                        <Controller
                        name="description"
                        as={
                            <TextField
                            name="description"
                            style={textFieldStyle}
                            label="Descripcion"
                            variant="outlined"
                            error={fieldsErrors.description? true:false}
    
                            helperText={fieldsErrors.description?"Campo requerido.":""}
                            />
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                        }}
                        />
                    </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color={isCreating?"default":"primary"}
                            startIcon={<SaveIcon />}
                            disabled={isCreating || isFetching}
                            style={buttonStyle}
                        >
                            {
                            isCreating?
                            (<CircularProgress size={24}/>):
                            "Crear"
                            }
                            
                        </Button>
                    </Grid>
                </Grid>
            </form>
    );
};

export default FormPost;