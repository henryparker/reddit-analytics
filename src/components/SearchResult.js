import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
export class SearchResult extends Component{

    

    render(){
        // console.log(React.Children);
        // let analytics = this.props && this.props.sentiment.length > 0? 
        // this.props.sentiment.map(result=> 
        // <div>
        //     <h1>score : {result.score}</h1>
        //     <br/>
        //     <h1>negative : {result.negative.length > 0 ? _.join(result.negative, ', ') : <p>none</p> }</h1>
        //     <br></br>
        //     <h1>positive : {result.positive.length > 0 ? _.join(result.positive, ', ') : <p>none</p>}</h1>
        // </div>) : 
        // <p>no analytics</p>;

        let results = this.props && this.props.result.length > 0 && this.props.sentiment.length >= this.props.result.length ?
        this.props.result.map((result,index)=> 
        <li className="text-left list-group-item text-secondary" key={result.id}>
            <div className="media">
                <img className="img-fluid img-thumbnail" src={result.thumbnail !== "self" && result.thumbnail !== "default" ? result.thumbnail: "https://images.unsplash.com/photo-1539553296722-f41aa0d2d184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ea590d8dd6c9247b9a2d2237b198d5f&auto=format&fit=crop&w=634&q=80"}></img>
                <div className="media-body">
                    <h3 className="mt-0"><a href={`http://reddit.com${result.permalink}` } target="_blank">{index} {result.title}</a></h3>
                    <br></br>
                    <p>{result.selftext}</p>
                    <h4>score : {this.props.sentiment[index].score !== null ? this.props.sentiment[index].score : "none" }</h4>
                    <br/>
                    <h4>negative : {this.props.sentiment[index].negative.length > 0 ? _.join(this.props.sentiment[index].negative, ', ') : <p>none</p> }</h4>
                    <br></br>
                    <h4>positive : {this.props.sentiment[index].positive.length > 0 ? _.join(this.props.sentiment[index].positive, ', ') : <p>none</p>}</h4>
    
                </div>
            </div>
        </li>) : 
        <p>no result</p>;
        console.log(this.props.result);
        return(
            <div className="container-fluid">
                <ul className="list-group">
                    {results}
                    
                </ul>
            </div>
        )  
    }
           
}


const mapStateToProps = (state) => {
    return {
      limit: state.input.limit,
      result: state.searchResult,
      sentiment : state.sentiment
    };
};

export default connect(mapStateToProps)(SearchResult);