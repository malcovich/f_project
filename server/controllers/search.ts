import Team from '../models/player';

export default class SearchCtrl {
  model = Team;

  getAnswer = (req, res) => {
      console.log("==========",req.body.query)
      let player = {
          name: "Віталій Буяльский",
          match: {
              homeTeam: "Динамо",
              awayTeam: "Шахтар"
          }
      }
      res.status(200).json(player)
    // this.model.findOne({query: req.body.query }, (err, team) => {
    //     res.status(200).json({players: []});
    // });
  }

}
