import Team from '../models/team';

export default class TeamCtrl {
  model = Team;

  getMyTeam = (req, res) => {
    this.model.findOne({user: req.body.userId }, (err, team) => {
        res.status(200).json({players: []});
    });
  }

}
