import * as restify from 'restify';
import citiesRouteController from '../controllers/CitiesRouteController';

function citiesRoute(api: restify.Server) {
  let routeCtrl = new citiesRouteController();
  api.get('/cities/:CITY_ID', routeCtrl.get);
}

module.exports.routes = citiesRoute;