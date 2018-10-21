import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';
import _ from 'lodash';
import Chart from 'chart.js';
import {Bar, Radar} from 'react-chartjs-2';

export class SearchAnalitics extends Component{
    
   
    render(){
        let positiveWords = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)  ? this.props.combineSentiments.positiveWords: {};
        let countPositive = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)  ? this.props.combineSentiments.countPositive : 0;
        let negativeWords = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)   ? this.props.combineSentiments.negativeWords: {};
        let countNegative = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ? this.props.combineSentiments.countNegative : 0;
        let score = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ? this.props.combineSentiments.score: {};
    
        // var arr1 = Object.keys(positiveWords).sort();
        // var arr2 = arr1.map(function (k) {
        // return positiveWords[k];
        
        const sortData = (wordObject) =>{
            let arr1 = [];
            for(let word in wordObject){
                arr1.push([word, wordObject[word]]);
            }
            arr1.sort(function(a, b) {
                return b[1] - a[1];
            });
            return arr1
        }
         const createColor = (sortable)=>{
            var dynamicColors = function() {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        return "rgb(" + r + "," + g + "," + b + ")";};
                    let color = [];
                    sortable.forEach(()=>color.push(dynamicColors()));
                    return color
        }
        // positive words Bar 
        let positiveWordsSortable = sortData(positiveWords);
        let positiveBarColor = createColor(positiveWordsSortable);
        let positiveBarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: positiveWordsSortable.map(val => val[0]),
            datasets: [{
                label:'frequency',
                data: positiveWordsSortable.map(val => val[1]),
                backgroundColor: positiveBarColor
            }] } : {};
        let postiveWordBarChart = !_.isEmpty(positiveBarData) ?<div><h3>Positive Sentiments</h3> <Bar data={positiveBarData} option={{}}></Bar></div> : <h1></h1>;

        // negative words Bar
        let negativeWordsSortable = sortData(negativeWords);
        let negativeBarColor = createColor(negativeWordsSortable);
        let negativeBarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: negativeWordsSortable.map(val => val[0]),
            datasets: [{
                label:'frequency',
                data: negativeWordsSortable.map(val => val[1]),
                backgroundColor: negativeBarColor
            }] } : {};
        let negativeBarChart = !_.isEmpty(negativeBarData) ?<div><h3>Negative Sentiments</h3> <Bar data={negativeBarData} option={{}}></Bar></div> : <h1></h1>;
        
        // score Radar
        let scoreLabel = Object.keys(score).slice(1);
        let scoreData = scoreLabel.map(k => score[k]);
        console.log(scoreLabel);
        console.log(scoreData)
        let scoreRadarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: scoreLabel,
            datasets: [{
                label:'score frequency',
                data: scoreData,
                backgroundColor: 'rgba(76, 76, 178, 0.9)'
            }] } : {};
        let scoreRadarChart = !_.isEmpty(scoreRadarData) ?<div><h3>Score Distribution</h3> <Radar data={scoreRadarData} option={{}}></Radar></div> : <h1></h1>;
        // if(this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)){
        //     let barData = {
        //         labels: arr1,
        //         datasets: [{
        //             label:'no idea what this is',
        //             data: arr2
        //         }] } 
        //     return( <Bar data={barData}></Bar>)
        // }

    
        // let countPositve = this.props && 
        // this.props.sentiment.length > 0 && 
        // this.props.combineSentiments.score.length > 0 ? _.countBy(this.props.combineSentiments.posiveWords): {};
        // console.log(countPositve);
        
        return(
            <div className="container">
            {scoreRadarChart}
            {postiveWordBarChart}
            {negativeBarChart}
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term)=> dispatch(changingTerm(term)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state) => {
    return {
      sentiment : state.sentiment,
      combineSentiments : state.combineSentiments
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchAnalitics);