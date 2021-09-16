import MoviesModel from './model/movies-model.js';
import {EndPoint, Method} from './types';

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies(){
    return this._load({url: EndPoint.MOVIES})
      .then(Api.toJSON)
      .then((movies) => movies.map(MoviesModel.adaptToClient));
  }

  updateMovie(movie) {
    return this._load({
      url: `${EndPoint.MOVIES}/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  getComments(movieId){
    return this._load({url: `${EndPoint.COMMENTS}/${movieId}`})
      .then(Api.toJSON);
  }

  addComment(comment, movieId) {
    return this._load({
      url: `${EndPoint.COMMENTS}/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  deleteComment(commentId) {
    return this._load({
      url: `${EndPoint.COMMENTS}/${commentId}`,
      method: Method.DELETE,
    });
  }

  sync(movie) {
    return this._load({
      url: `${EndPoint.MOVIES}/${EndPoint.SYNC}`,
      method: Method.POST,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
