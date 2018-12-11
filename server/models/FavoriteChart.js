const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteChartSchema = new Schema({

},{strict:false})

mongoose.model('favoriteChartSchema',favoriteChartSchema);