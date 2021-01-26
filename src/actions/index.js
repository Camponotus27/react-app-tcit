import axios from 'axios';
import config from './../config/config.json';

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ERROR_RECEIVE_POSTS = 'ERROR_RECEIVE_POSTS'

export const REQUEST_ADD_POSTS = 'REQUEST_ADD_POSTS'
export const RECEIVE_RESPONSE_ADD_POSTS = 'RECEIVE_RESPONSE_ADD_POSTS'
export const ERROR_RECEIVE_RESPONSE_ADD_POSTS = 'ERROR_RECEIVE_RESPONSE_ADD_POSTS'

export const REQUEST_DELETE_POSTS = 'REQUEST_DELETE_POSTS'
export const RECEIVE_RESPONSE_DELETE_POSTS = 'RECEIVE_RESPONSE_DELETE_POSTS'
export const ERROR_RECEIVE_RESPONSE_DELETE_POSTS = 'ERROR_RECEIVE_RESPONSE_DELETE_POSTS'

export const SEARCH_POSTS = 'SEARCH_POSTS'

export const REMOVE_ERROR = 'REMOVE_ERROR'


export function removeError(){

  return dispatch => {

      dispatch({
        type: REMOVE_ERROR
      })
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(data) {
  return {
    type: RECEIVE_POSTS,
    payload: data
  }
}

function erroReceivePosts(data) {
  return {
    type: ERROR_RECEIVE_POSTS,
    payload: data
  }
}

export function fetchPosts(){

    return dispatch => {

        dispatch(requestPosts())

        return axios.get(`${config.API_URL}/posts`)
        .then(res =>{
            let data = res.data.data;
            dispatch(receivePosts(data))
        })
        .catch(err =>{
          dispatch(erroReceivePosts(err))
        });

    }
}


function requestAddPosts() {
  return {
    type: REQUEST_ADD_POSTS
  }
}


function receiveResponseAddPosts(data) {
  return {
    type: RECEIVE_RESPONSE_ADD_POSTS,
    payload: data
  }
}

function errorReceiveResponseAddPosts(data) {
  return {
    type: ERROR_RECEIVE_RESPONSE_ADD_POSTS,
    payload: data
  }
}

export function addPosts(post){
  return dispatch => {

      dispatch(requestAddPosts())

      return axios.post(`${config.API_URL}/posts`, post)
      .then(res =>{
          let data = res.data.data;
          dispatch(receiveResponseAddPosts(data.shift()))
      })
      .catch(err =>{
          dispatch(errorReceiveResponseAddPosts(err))
      });

  }
}

function requestDeletePosts(data) {
  return {
    type: REQUEST_DELETE_POSTS,
    payload: data
  }
}


function receiveResponseDeletePosts(data) {
  return {
    type: RECEIVE_RESPONSE_DELETE_POSTS,
    payload: data
  }
}

function errorReceiveResponseDeletePosts(data) {
  return {
    type: ERROR_RECEIVE_RESPONSE_DELETE_POSTS,
    payload: data
  }
}

export function deletePosts(post){
  return dispatch => {

      dispatch(requestDeletePosts(post))
      return axios.delete(`${config.API_URL}/posts/${post.id}`)
      .then(res =>{
          dispatch(receiveResponseDeletePosts(post))
      })
      .catch(err =>{
        dispatch(errorReceiveResponseDeletePosts(err))
      });

  }
}



export function searchPosts(parameterSearch){
  return dispatch => {

    dispatch({
      type: SEARCH_POSTS,
      payload: parameterSearch
    })

  }
}