import * as mongoose from 'mongoose';
import League from './league';

const clubSchema = new mongoose.Schema({
  name: String,
  ukrName : String,
  tournament : String,
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
  places: [{
    round: Number,
    place: Number
  }]
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
