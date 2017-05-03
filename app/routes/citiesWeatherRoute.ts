import * as restify from 'restify';
import citiesWeatherRouteController from '../controllers/CitiesWeatherRouteController';

function citiesWeatherRoute(api: restify.Server) {
  let routeCtrl = new citiesWeatherRouteController();
  api.get('/cities/:CITY_ID/weather', routeCtrl.get);
}

module.exports.routes = citiesWeatherRoute;