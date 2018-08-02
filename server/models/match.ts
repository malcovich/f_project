import * as mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  tour: String,
  homeT: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  awayT: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
  score: String,
  date: Date
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
