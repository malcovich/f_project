import * as mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  tour: String,
  homeT: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  awayT: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
  score: String,
  date: Date
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
