import React, { useState } from 'react';

// Redux
import { searchPosts } from './../actions/index';
import { useDispatch } from 'react-redux'

// UI components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const SearchSection = () => {

    // estilos

    const formStyle = {
        width: '100%'
    }

    const textFieldStyle = {
        marginRight: 40,
        marginBottom: 15,
        width: 400
    }

    const gridStyle = {
        marginTop: 100
    }

    const buttonStyle = {
        marginRight: 20
    }
    
    
    // hooks
    const [ parameterSearch, setParameterSearch ] = useState();


    const dispatch = useDispatch();
    
    // funciones

    const onInputChange = (e) =>{
        const {value } = e.target;
        setParameterSearch(value);

        if(!value)
            dispatch(searchPosts(''));
    };


    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(searchPosts(parameterSearch));
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            style={formStyle}
            >
            <Grid
                style={gridStyle}
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                >
                
                <TextField
                    name="name"
                    value={parameterSearch}
                    style={textFieldStyle}
                    label="Filtro de Nombre"
                    variant="outlined"
                    onChange={onInputChange}
                />
            <Button
                    type="submit"
                    style={buttonStyle}
                    variant="contained"
                    startIcon={<SearchIcon />}
                >
                    Buscar
                    
                </Button>
            </Grid>    
        </form>
    );
};

export default SearchSection;