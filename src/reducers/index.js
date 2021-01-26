import {
    REMOVE_ERROR,

    REQUEST_POSTS,
    RECEIVE_POSTS,
    ERROR_RECEIVE_POSTS,
    REQUEST_ADD_POSTS,
    RECEIVE_RESPONSE_ADD_POSTS,
    ERROR_RECEIVE_RESPONSE_ADD_POSTS,
    REQUEST_DELETE_POSTS,
    RECEIVE_RESPONSE_DELETE_POSTS,
    ERROR_RECEIVE_RESPONSE_DELETE_POSTS,
    SEARCH_POSTS
} from './../actions/index';

const inicialValue = {
    searchParameter: '',
    isFetching: false,
    posts: [],
    isCreating: false,
    isDeleting: {
        isDeleting: false,
        idDeleting: 0
    },
    alert:{
        message: '',
        err: '',
        severity: 'info'
    }
  };
  
const postReducer = (state = inicialValue, action) => {
    switch(action.type) {
        case REMOVE_ERROR:
            return {
                ...state, 
                alert: {
                    message: '',
                    err: '',
                    severity: 'info'
                }
            };
        case REQUEST_POSTS:
            return {
                ...state, 
                isFetching: true
            };
        case RECEIVE_POSTS:
            return {
                ...state, 
                posts: action.payload, 
                isFetching: false,
                alert: {
                    message: `Posts cargados`,
                    err: '',
                    severity: 'success'
                }
            };
        case ERROR_RECEIVE_POSTS:
            return {
                alert: {
                    message: `Error ${action.payload}`,
                    err: '',
                    severity: 'error'
                }
            };
        case REQUEST_ADD_POSTS:
            return {
                ...state, 
                isCreating: true
            };
        case RECEIVE_RESPONSE_ADD_POSTS:
            return {
                ...state, 
                posts: [...state.posts, action.payload], 
                isCreating: false,
                alert: {
                    message: `Posts creado exitosamente`,
                    err: '',
                    severity: 'success'
                }
            };
        case ERROR_RECEIVE_RESPONSE_ADD_POSTS:
                return {
                    alert: {
                        message: `Error ${action.payload}`,
                        err: '',
                        severity: 'error'
                    }
                };
        case REQUEST_DELETE_POSTS:
            return {
                ...state, 
                isDeleting: {
                    isDeleting: true,
                    idDeleting: action.payload.id
                }
            };
        case RECEIVE_RESPONSE_DELETE_POSTS:
            return {
                ...state, 
                posts: [...state.posts].filter(post => post.id !== action.payload.id), 
                isDeleting: {
                    isDeleting: false,
                    idDeleting: 0
                },
                alert: {
                    message: `Posts eliminado exitosamente`,
                    err: '',
                    severity: 'success'
                }
            };
        case ERROR_RECEIVE_RESPONSE_DELETE_POSTS:
                return {
                    alert: {
                        message: `Error ${action.payload}`,
                        err: '',
                        severity: 'error'
                    }
                };
        case SEARCH_POSTS:
            return {
                ...state, 
                searchParameter: action.payload
            };
        default:
            return state;
    }
};

export default postReducer;