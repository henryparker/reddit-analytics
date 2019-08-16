const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteChartSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { strict: false }
);

mongoose.model('favoriteChartSchema', favoriteChartSchema);
