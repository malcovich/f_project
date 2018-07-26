import Team from '../models/player';

export default class SearchCtrl {
  model = Team;
  FIRST_WORDS = [{value: "Кто"}, {value: "Сколько"}];

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
  }

}
