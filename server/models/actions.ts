import * as mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  type: String,
  club: {type: mongoose.Schema.Types.ObjectId, ref: 'Club'},
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
  match: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
  minutes: Number
});

const Action = mongoose.model('Action', actionSchema);

export default Action;
