import Team from '../models/player';

export default class PlayerCtrl {
  model = Team;

  getMyTeam = (req, res) => {
    this.model.findOne({user: req.body.userId }, (err, team) => {
        res.status(200).json({players: []});
    });
  }

}
