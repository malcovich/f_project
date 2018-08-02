import Action from '../models/actions';
import Player from '../models/player';
import Match from '../models/match';
import Club from '../models/clubs';


export default class SearchCtrl {
    FIRST_WORDS = [{ value: "Кто", entity: ["Player"] }, { value: "Сколько" }];
    ARRAY_OF_VERBS = [{ verb: ["забил"], entity: ["Action"] }];
    ACTION_TYPE = [{ 'name': ["гол"], type: 'goal' }, { "name": ["автогол"], type: 'autogoal' }];

    CLUBS = [
        {'name': "Черноморец", 'sub_name': "Чорноморцу"}
    ];

    PlayerModel = Player;
    ClubModel = Club;
    MatchModel = Match;

    getAnswer = (req, res) => {
        let arrayOfWords = req.body.query.split(' ');
        let keyIndex = this.FIRST_WORDS.filter(w => w.value == arrayOfWords[0]);
        let actionType = this.ACTION_TYPE.filter(a => arrayOfWords.filter(word => a.name.indexOf(word) > -1));
        let action = this.ARRAY_OF_VERBS.filter(v => arrayOfWords.filter(word => v.verb.indexOf(word) > -1));
        let club = this.CLUBS.filter(c => arrayOfWords.filter(word => c.sub_name.indexOf(word) > -1));
        if (club){
            Club.find({'ukrName': club[0].name}).exec((err,club) =>{
                Action.find({ $and :[{type: 'goal'}, {$or :[{'homeT': club._id}, {awayT: club._id}]}]})
                .populate({path: 'player', populate: [{path:'club'}]})
                .populate({path: 'match', populate: [{path:'homeT'},{path:'awayT'}]})
                .exec(function (err, actions) {
                    if (err) console.log(err);
                    console.log(actions)
                    res.status(200).json(actions);
                })
            }) 
            
        }else if (keyIndex && action) {
            Action.find({ type: { $in: this.prepareTypes(actionType) } })
                .populate({path: 'player', populate: [{path:'club'}]})
                .populate({path: 'match', populate: [{path:'homeT'},{path:'awayT'}]})
                .exec(function (err, actions) {
                    if (err) console.log(err);
                    res.status(200).json(actions);
            })
        }
    }

    prepareTypes(actionType) {
        return actionType.map(action => action.type);
    }

}
