import figlet from 'figlet';
import { Server, serve } from 'bun';
import { usersController } from './controllers/users';
import { personsController } from './controllers/persons';
import { moviesController } from './controllers/movies';
import connectMongo from './config/database';

// Connect to mongodb
connectMongo();

/**
 * -------------------------------------------
 * START SERVER
 * -------------------------------------------
 */
const server: Server = serve({
  port: 4000,
  async fetch(request: Request) {
    const { url, method } = request;
    const { pathname, searchParams } = new URL(url);
    const apiRouter = '/api';

    // ------------- API USER --------------
    if (pathname === `${apiRouter}/users` && method === 'GET') {
      return await usersController.getUsers();
    }

    // Get User
    if (pathname === `${apiRouter}/user` && method === 'GET') {
      const id = searchParams.get('id') || '';
      return await usersController.getUserData(id);
    }

    if (pathname === `${apiRouter}/user` && method === 'POST') {
      return await usersController.createUser(request);
    }

    if (pathname === `${apiRouter}/suggestion` && method === 'GET') {
      const id = searchParams.get('id') || '';
      return await usersController.suggestionUser(id);
    }

    // ------------- API PERSON --------------
    if (pathname === `${apiRouter}/person` && method === 'GET') {
      const id = searchParams.get('id') || '';
      return await personsController.getPersonByUserId(id);
    }

    if (pathname === `${apiRouter}/find/person` && method === 'POST') {
      return await personsController.findPerson(request);
    }
    if (pathname === `${apiRouter}/save/person` && method === 'POST') {
      return await personsController.handleRemoveOrCreatePerson(request);
    }

    // ------------- API MOVIES --------------
    if (pathname === `${apiRouter}/movie` && method === 'GET') {
      const id = searchParams.get('id') || '';
      return await moviesController.getMovieByUserId(id);
    }

    if (pathname === `${apiRouter}/find/movie` && method === 'POST') {
      return await moviesController.findMovie(request);
    }
    if (pathname === `${apiRouter}/save/movie` && method === 'POST') {
      return await moviesController.handleRemoveOrCreateMovie(request);
    }

    const body = figlet.textSync('Bun!');
    return new Response(body);
  }
});

console.log(`Listening on http://localhost:${server.port} ...`);
