import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';
import _ from 'lodash';
import Chart from 'chart.js';
import {Bar} from 'react-chartjs-2';

export class SearchAnalitics extends Component{
    componentDidUpdate(){
        
    }

    
    render(){
        let countUniquePositve = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)  ? _.countBy(this.props.combineSentiments.positiveWords): {};
        let countPositive = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)  ? this.props.combineSentiments.positiveWords.length : 0;
        let countUniqueNegative = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments)   ? _.countBy(this.props.combineSentiments.negativeWords): {};
        let countNegative = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ? this.props.combineSentiments.negativeWords.length : 0;
        let countScore = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ? _.countBy(this.props.combineSentiments.score): {};

        var arr1 = Object.keys(countUniquePositve);
        var arr2 = arr1.map(function (k) {
        return countUniquePositve[k];
        });
        console.log(countPositive);
        console.log(countUniquePositve);
        console.log(countNegative);
        console.log(countUniqueNegative);
        console.log(countScore);

        var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";};
        let color = [];
        arr1.forEach(()=>color.push(dynamicColors()));
        console.log(color);
        let barData = this.props && this.props.sentiment.length > 0 && !_.isEmpty(this.props.combineSentiments) ?  {chartData:{
            labels: arr1,
            datasets: [{
                label:'frequency',
                data: arr2,
                backgroundColor: color
            }] }} : {};
            
        let barChart = !_.isEmpty(barData) ? <Bar data={barData.chartData} option={{}}></Bar> : <h1>no chart</h1>;
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
            <div>{barChart}</div>
            
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