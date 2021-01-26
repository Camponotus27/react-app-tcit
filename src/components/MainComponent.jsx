import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

// UI component
import Grid from '@material-ui/core/Grid';

// components
import SearchSection from './SearchSection';
import ListPosts from './ListPosts';
import FormPost from './FormPost';

const MainComponent = ({ posts, isFetching, searchParameter}) => {

    const conteinerStyle = {
        padding: '0 20px'
    };

    const filterPostBysearchParameter = (posts, searchParameter) =>{
        if(searchParameter)
        {
            return posts.filter(
                (post) => post 
                && post.name 
                && post.name.toLowerCase().includes(searchParameter.toLowerCase())
            );
        }
        
        return posts;
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={conteinerStyle}
            >
                <Grid 
                    container
                    item
                    xs={12}
                    sm={8}
                    >
                    <SearchSection></SearchSection>
                    <ListPosts listPost={filterPostBysearchParameter(posts, searchParameter)} isFetching={isFetching}></ListPosts>
                    <FormPost></FormPost>
                </Grid>
  
        </Grid>
    )
}

MainComponent.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired
        })
      ).isRequired
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        isFetching: state.isFetching,
        searchParameter: state.searchParameter
    }
}

export default connect(mapStateToProps)(MainComponent)
