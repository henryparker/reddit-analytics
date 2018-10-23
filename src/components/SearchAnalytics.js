import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm,addSavedChart} from '../actions/search';
import _ from 'lodash';
import Chart from 'chart.js';
import {Bar, Radar, Polar} from 'react-chartjs-2';

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

        const sortDataByKey = (wordObject) =>{
            let arr1 = [];
            for(let word in wordObject){
                arr1.push([word, wordObject[word]]);
            }
            arr1.sort(function(a, b) {
                return b[0] - a[0];
            });
            return arr1
        }

         const createColor = (sortable)=>{
            var dynamicColors = function() {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        return "rgba(" + r + "," + g + "," + b +")";};
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
        let postiveWordBarChart = !_.isEmpty(positiveBarData) ?<div><h3>Positive Sentiments</h3> <Bar data={positiveBarData} options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }}></Bar><br/></div> : <h1></h1>;
        let postiveWordBarChartButton = !_.isEmpty(positiveBarData) ? <div><button onClick={()=>{this.props.addSavedChart(this.props.term,postiveWordBarChart)}}>add to favs</button><br/><br/></div> :<span></span>

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
        let negativeBarChart = !_.isEmpty(negativeBarData) ?<div><h3>Negative Sentiments</h3> <Bar data={negativeBarData} options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }}></Bar><br/></div> : <h1></h1>;
        let negativeBarChartButton = !_.isEmpty(negativeBarData) ? <div><button onClick={()=>{this.props.addSavedChart(this.props.term,negativeBarChart)}}>add to favs</button><br/><br/></div> :<span></span>

        
        // wordCount Bar
        let wordCountBarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: ['#positive words','#negative words'],
            datasets: [{
                label:'frequency',
                data: [countPositive,countNegative],
                backgroundColor: ['rgba(32, 79, 207, 0.9)','rgba(225, 65, 65, 0.9)']
            }] } : {};
        let wordCountChart = !_.isEmpty(wordCountBarData) ?<div><h3>Word counts</h3> <Bar data={wordCountBarData} options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }}></Bar><br/></div> : <h1></h1>;
        let wordCountButton = !_.isEmpty(wordCountBarData) ? <div><button onClick={()=>{this.props.addSavedChart(this.props.term,wordCountChart)}}>add to favs</button><br/><br/></div>:<span></span>
       

        
        // score Radar
        delete score[0];
        // let scoreLabel = Object.keys(score);
        // let scoreData = scoreLabel.map(k => score[k]);
        
        let scoreSortable = sortDataByKey(score);
        scoreSortable = scoreSortable.filter(val => val[1]>1 );
        let scoreSortablePositive = scoreSortable.filter(val => val[0]>0 );
        let scoreSortableNegative = scoreSortable.filter(val => val[0]<0 );
        scoreSortableNegative = scoreSortableNegative.sort((a,b)=>a[0]-b[0]);
        scoreSortable = scoreSortablePositive.concat(scoreSortableNegative);
        console.log(scoreSortable);
        // console.log(scoreLabel);
        // console.log(scoreData);
        let scoreRadarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: scoreSortable.map(val=>val[0]),
            datasets: [{
                label:'score frequency',
                data: scoreSortable.map(val=>val[1]),
                backgroundColor: 'rgba(76, 76, 178, 0.9)'
            }] } : {};
        let scoreRadarChart = !_.isEmpty(scoreRadarData) ?<div><h3>Score Radar Distribution</h3> <Radar data={scoreRadarData} options={{}}></Radar><br/></div> : <h1></h1>;
        let scoreRadarChartButton = !_.isEmpty(scoreRadarData) ? <div><button onClick={()=>{this.props.addSavedChart(this.props.term,scoreRadarChart)}}>add to favs</button><br/><br/></div> :<span></span>

        //score Polar Chart
        let scorePolarPosCol = scoreSortablePositive.map(()=>'rgba(32, 79, 207, 0.9)');
        let scorePolarNegCol = scoreSortableNegative.map(()=>'rgba(225, 65, 65, 0.9)');
        let scorePolarColor = scorePolarPosCol.concat(scorePolarNegCol);
        console.log(scorePolarColor)
        let scorePolarData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {
            labels: scoreSortable.map(val=>val[0]),
            datasets: [{
                label:'score frequency',
                data: scoreSortable.map(val=>val[1]),
                backgroundColor: scorePolarColor
            }] } : {};
        let scorePolarChart = !_.isEmpty(scorePolarData) ?<div><h3>Score Polar Distribution</h3> <Polar data={scorePolarData} options={{}}></Polar><br/></div> : <h1></h1>;
        let scorePolarChartButton = !_.isEmpty(scorePolarData) ? <div><button onClick={()=>{this.props.addSavedChart(this.props.term,scorePolarChart)}}>add to favs</button><br/><br/></div> :<span></span>

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
            <br/>
            {scoreRadarChart}
                
                {scoreRadarChartButton}
                
            {scorePolarChart}
                
                {scorePolarChartButton}
                
            {wordCountChart}
               
                {wordCountButton}     
                
            {negativeBarChart}
                
                {negativeBarChartButton}
                
            {postiveWordBarChart}
                
                {postiveWordBarChartButton}
              
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addSavedChart: (term,savedChartData)=> dispatch(addSavedChart(term,savedChartData)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state) => {
    return {
      term: state.input.term,
      sentiment : state.sentiment,
      combineSentiments : state.combineSentiments
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchAnalitics);