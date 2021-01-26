import React from 'react';
import PropTypes from 'prop-types';

import { getSequentialRandonLength } from './../utils/index';

// Ui components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// components
import Post from './Post';

const ListPosts = (props) => {

    const { listPost, isFetching} = props;

    const tableStyle = {
      minWidth: 600
    };
    
    const getPostOrSkeleton = (listPost) => {

        if(isFetching && listPost.length === 0){
          const randomSequential = getSequentialRandonLength(4, 10)

          return randomSequential.map((number) =>{
            return {
              id: number,
              name: 'fake name',
              description: 'fake desctipcion'
            };
          });
        }

        return listPost;
    };
    
    return (
    <TableContainer >
      <Table aria-label="simple table" style={tableStyle}>
        <TableHead style={{ background: '#7873FF'}}>
          <TableRow>
            <TableCell align="left" style={{width: 200}}><h3>Nombre</h3></TableCell>
            <TableCell align="left"><h3>Descripcion</h3></TableCell>
            <TableCell align="center" style={{width: 100}}><h3>Accion</h3></TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        {
          !isFetching && listPost.length === 0?
          (
            <TableRow >
              <TableCell colSpan="3" align="center">
                  <h3>No hay Posts</h3>
              </TableCell>
            </TableRow>
          )
          :
          (
              getPostOrSkeleton(listPost).map((post, index) => (
                <Post 
                skeleton={isFetching}
                key={post.id}
                post={post}
                style={{ background: '#7873FF'}}
                index={index}
              ></Post>
              )
            )
          )
        }
        </TableBody>

        
      </Table>
    </TableContainer>
    );
};

ListPosts.propsTypes = {
  listPost: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequerid,
};

export default ListPosts;