const { default: axios } = require('axios');
const apiKey = process.env.TMDB_API_KEY;

class Controller {
  static async movieList(req, res, next) {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });
      res.status(200).json(
        response.data.results.map((e) => {
          return {
            title: e.title,
            posterUrl: `https://image.tmdb.org/t/p/original${e.poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${e.backdrop_path}`,
            overview: e.overview,
            tmdbId: e.id,
          };
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = Controller;
