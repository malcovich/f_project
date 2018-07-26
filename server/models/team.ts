import * as mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  user: String
});

const Team = mongoose.model('Team', teamSchema);

export default Team;