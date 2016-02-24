import {get} from 'jquery';
import ServerActions from './actions/ServerActions';
let API = {
  fetchLinks(){
    console.log('1. In API')

    get("/data/links").done(ServerActions.receiveLinks)
  }
};

export default API;
