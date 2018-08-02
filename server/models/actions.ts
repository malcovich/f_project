import * as mongoose from 'mongoose';
import Player from '../models/player'
import Match from '../models/match';

const actionSchema = new mongoose.Schema({
  type: String,
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
  match: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
  minutes: Number
});

const Action = mongoose.model('Action', actionSchema);

export default Action;
