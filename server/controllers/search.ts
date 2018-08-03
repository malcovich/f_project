import Action from '../models/actions';
import Player from '../models/player';
import Match from '../models/match';
import Club from '../models/clubs';


export default class SearchCtrl {
    FIRST_WORDS = [{ value: "Кто", entity: ["Player"] }, { value: "Сколько" }];
    ARRAY_OF_VERBS = [{ verb: ["забил"], entity: ["Action"] }];
    ACTION_TYPE = [{ 'name': ["гол"], type: 'goal' }, { "name": ["автогол"], type: 'autogoal' }];
    RELATIVE_WORD =['у','за'];

    CLUBS = [
        {'name': "Черноморец", 'sub_name': ["Черноморцу", "Черноморца"]},
        {'name': "Карпати", 'sub_name': ["Карпатам", "Карпат"]}
    ];

    PlayerModel = Player;
    ClubModel = Club;
    MatchModel = Match;

    getAnswer = (req, res) => {
        let arrayOfWords = req.body.query.split(' ');
        let keyIndex = this.FIRST_WORDS.filter(w => w.value == arrayOfWords[0]);
        let actionType = this.ACTION_TYPE.filter(a =>{ 
            if(arrayOfWords.filter(word => {
                if (a.name[0] === word){
                    return word
                }
            }).length){
                return a;
            }
        });

        let action = this.ARRAY_OF_VERBS.filter(v => arrayOfWords.filter(word => v.verb.indexOf(word) > -1));
        let club;
        this.CLUBS.forEach(c => {
            let sub_name = c.sub_name;
            let a = arrayOfWords.filter(word => {
                if (c.sub_name.indexOf(word) > -1) {
                    return word
                }
            });
            if (a.length > 0) {
                club = { 'club': c, 'indexW': a[0] };
                return;
            }
        });
            console.log(club, club.name)
        if (club){
            let wordBeforeClub = arrayOfWords[arrayOfWords.indexOf(club.indexW)-1];
            if (this.RELATIVE_WORD.indexOf(wordBeforeClub) > -1 && action) {
                Club.find({'ukrName': club.club.name}).exec((err,club) =>{
                    console.log(club)
                    Action.find({ $and :[{type: { $in: this.prepareTypes(actionType) }}, {$or :[{'homeT': club[0]._id}, {awayT: club[0]._id}]}]})
                    .populate({path: 'player', populate: [{path:'club'}]})
                    .populate({path: 'match', populate: [{path:'homeT'},{path:'awayT'}]})
                    .exec(function (err, actions) {
                        if (err) console.log(err);
                        res.status(200).json(actions);
                    })
                }) 
            }else {
                Club.find({'ukrName': club.club.name}).exec((err,club) =>{
                    Action.find({ $and :[{type: 'goal'}, {$or :[{'homeT': club._id}, {awayT: club._id}]}]})
                    .populate({path: 'player', populate: [{path:'club'}]})
                    .populate({path: 'match', populate: [{path:'homeT'},{path:'awayT'}]})
                    .exec(function (err, actions) {
                        if (err) console.log(err);
                        res.status(200).json(actions);
                    })
                }) 
            }
            
            
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
