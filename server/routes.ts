import * as express from 'express';

import UserCtrl from './controllers/user';
import User from './models/user';
import TeamCtrl from './controllers/team';
import SearchCtrl from './controllers/search'

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const teamCtrl = new TeamCtrl();
  const searchCtrl = new SearchCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Search
  router.route('/search').post(searchCtrl.getAnswer);


  // Teams

  router.route('/team').post(teamCtrl.getMyTeam);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}