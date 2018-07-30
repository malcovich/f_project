import Action from '../models/actions';
import Player from '../models/player';



export default class SearchCtrl {
    FIRST_WORDS = [{ value: "Кто", entity: ["Player"]}, { value: "Сколько" }];
    ARRAY_OF_VERBS = [{verb: ["забил"], entity: ["Action"]}];
    ACTION_TYPE = [{'name': ["гол"], type: 'goal'},{"name": ["автогол"], type: 'autogoal'}];

    getAnswer = (req, res) => {
        console.log("==========", req.body.query)
        let arrayOfWords =  req.body.query.split(' ');
        console.log("Arr", arrayOfWords)
        let keyIndex = this.FIRST_WORDS.filter(w => w.value == arrayOfWords[0]);
        let actionType = this.ACTION_TYPE.filter(a => arrayOfWords.filter(word=> a.name.indexOf(word) > -1));
        let action = this.ARRAY_OF_VERBS.filter(v => arrayOfWords.filter(word=> v.verb.indexOf(word) > -1))
        console.log(1, action, actionType)
        if (keyIndex && action) {
            console.log(this.prepareTypes(actionType))
            Action.find({type:{$in: this.prepareTypes(actionType)}}).populate('player').exec(function(err, actions){
                    if (err) console.log(err);
                    console.log(12, actions)
            })
        }
        console.log("key", keyIndex);
        let player = {
            name: "Віталій Буяльский",
            match: {
                homeTeam: "Динамо",
                awayTeam: "Шахтар"
            }
        }
        res.status(200).json(player)
    }

    prepareTypes(actionType){
        return actionType.map(action => action.type);
    }

}
