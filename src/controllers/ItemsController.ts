import { Request, Response } from 'express';

import knex from '../database/connection';

const API_URL = process.env.APP_API_URL;

class ItemsController {
  async index(request: Request, response: Response): Promise<Response> {
    const items = await knex('items').select('*');

    const serialisedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${API_URL}uploads/${item.image}`,
      };
    });

    return response.json(serialisedItems);
  }
}

export default ItemsController;
