import React, {Component} from 'react';
import { connect } from 'react-redux';

export class SearchResult extends Component{

    render(){
    
        let results = this.props && this.props.result.length > 0? 
        this.props.result.map(result=> 
        <li class="text-left list-group-item text-primary" key={result.id}>
        <img class="img-fluid img-thumbnail" src={result.thumbnail !== "self" && result.thumbnail !== "default"? result.thumbnail: "https://images.unsplash.com/photo-1539553296722-f41aa0d2d184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ea590d8dd6c9247b9a2d2237b198d5f&auto=format&fit=crop&w=634&q=80"}></img>
        <a href={`http://reddit.com${result.permalink}`} target="_blank"><p>{result.title}</p></a>
        </li>) : 
        <p>no result</p>;

        return(
            <div>
                <ul class="list-group">
                    {results}
                </ul>
            </div>
        )  
    }
           
}


const mapStateToProps = (state) => {
    return {
      result: state.searchResult
    };
};

export default connect(mapStateToProps)(SearchResult);