import { personsService } from '../services/persons';

class PersonsController {
  private responseHeader = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-control-allow-origin': '*'
    }
  };

  /**
   * get Person
   * @param {string|number} id
   * @returns
   */
  public async getPersonByUserId(id: string | number) {
    try {
      const data = await personsService.getPersonByUserId(id);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 PersonsController::getPersonByUserId::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * find Person
   * @param {Request} request
   * @returns
   */
  public async findPerson(request: Request) {
    try {
      const body = await request.json();
      const data = await personsService.findPerson(body);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 PersonsController::findPerson::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * handleRemoveOrCreatePerson
   * @param {Request} request
   * @returns
   */
  public async handleRemoveOrCreatePerson(request: Request) {
    try {
      const body = await request.json();
      const data = await personsService.handleRemoveOrCreatePerson(body);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(
        `🚀 PersonsController::handleRemoveOrCreatePerson::error ${error}`
      );
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }
}
export const personsController: PersonsController = new PersonsController();
