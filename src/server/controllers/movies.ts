import { moviesService } from '../services/movies';

class MoviesController {
  private responseHeader = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-control-allow-origin': '*'
    }
  };

  /**
   * get Movie By UserId
   * @param {string|number} id
   * @returns
   */
  public async getMovieByUserId(id: string | number) {
    try {
      const data = await moviesService.getMovieByUserId(id);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 MoviesController::getMovieByUserId::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * find Movie
   * @param {Request} request
   * @returns
   */
  public async findMovie(request: Request) {
    try {
      const body = await request.json();
      const data = await moviesService.findMovie(body);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 MoviesController::findMovie::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * handleRemoveOrCreateMovie
   * @param {Request} request
   * @returns
   */
  public async handleRemoveOrCreateMovie(request: Request) {
    try {
      const body = await request.json();
      const data = await moviesService.handleRemoveOrCreateMovie(body);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(
        `🚀 MoviesController::handleRemoveOrCreateMovie::error ${error}`
      );
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }
}
export const moviesController: MoviesController = new MoviesController();
