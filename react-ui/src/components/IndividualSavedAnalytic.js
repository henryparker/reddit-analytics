import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';
import {Bar, Radar, Polar} from 'react-chartjs-2';
import _ from 'lodash';
export class IndividualSavedAnalytic extends Component{
    render(){ 
        let positiveWords = this.props.favoriteChartData.dataSaved.positiveWords;
        let countPositive = this.props.favoriteChartData.dataSaved.countPositive;
        let negativeWords = this.props.favoriteChartData.dataSaved.negativeWords;
        let countNegative = this.props.favoriteChartData.dataSaved.countNegative;
        let score = this.props.favoriteChartData.dataSaved.score;
        
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
        let positiveBarData = !_.isEmpty(this.props.favoriteChartData.dataSaved) ?  {
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


        let negativeWordsSortable = sortData(negativeWords);
        let negativeBarColor = createColor(negativeWordsSortable);
        let negativeBarData = !_.isEmpty(this.props.favoriteChartData.dataSaved) ?  {
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

        let wordCountBarData = !_.isEmpty(this.props.favoriteChartData.dataSaved) ?  {
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

        delete score[0];
        // let scoreLabel = Object.keys(score);
        // let scoreData = scoreLabel.map(k => score[k]);
        
        let scoreSortable = sortDataByKey(score);
        scoreSortable = scoreSortable.filter(val => val[1]>1 );
        let scoreSortablePositive = scoreSortable.filter(val => val[0]>0 );
        let scoreSortableNegative = scoreSortable.filter(val => val[0]<0 );
        scoreSortableNegative = scoreSortableNegative.sort((a,b)=>a[0]-b[0]);
        scoreSortable = scoreSortablePositive.concat(scoreSortableNegative);
        // console.log(scoreLabel);
        // console.log(scoreData);
        let scoreRadarData = !_.isEmpty(this.props.favoriteChartData.dataSaved) ?  {
            labels: scoreSortable.map(val=>val[0]),
            datasets: [{
                label:'score frequency',
                data: scoreSortable.map(val=>val[1]),
                backgroundColor: 'rgba(76, 76, 178, 0.9)'
            }] } : {};
        let scoreRadarChart = !_.isEmpty(scoreRadarData) ?<div><h3>Score Radar Distribution</h3> <Radar data={scoreRadarData} options={{}}></Radar><br/></div> : <h1></h1>;


        let scorePolarPosCol = scoreSortablePositive.map(()=>'rgba(32, 79, 207, 0.9)');
        let scorePolarNegCol = scoreSortableNegative.map(()=>'rgba(225, 65, 65, 0.9)');
        let scorePolarColor = scorePolarPosCol.concat(scorePolarNegCol);
        let scorePolarData = !_.isEmpty(this.props.favoriteChartData.dataSaved) ?  {
            labels: scoreSortable.map(val=>val[0]),
            datasets: [{
                label:'score frequency',
                data: scoreSortable.map(val=>val[1]),
                backgroundColor: scorePolarColor
            }] } : {};
        let scorePolarChart = !_.isEmpty(scorePolarData) ?<div><h3>Score Polar Distribution</h3> <Polar data={scorePolarData} options={{}}></Polar><br/></div> : <h1></h1>;

        return (
        <div>
        <br/>
        <p className=" text-left h1">Saved Analytics from {this.props.favoriteChartData.date} </p>
        <br/>
        <p className="text-left h2">Term: {this.props.favoriteChartData.term}</p>
        <p className="text-left h2">Sample#: {this.props.favoriteChartData.limit}</p>
        <br/>
        {/* {this.props.favoriteChartData.dataSaved.map(val1=>val1)} */}
        {scoreRadarChart}
        {scorePolarChart}
        {wordCountChart}
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

const mapStateToProps = (state,props) => {
    return {
      sentiment : state.sentiment,
      combineSentiments : state.combineSentiments,
      favoriteChartData: state.favoriteChartData.find((favoriteChartData)=>favoriteChartData.id === props.match.params.id)
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(IndividualSavedAnalytic);