import { Request, Response } from 'express';

import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response): Promise<Response> {
    const points = await knex('points').orderBy('id').select('*');

    const pointsMapped = points.map(point => {
      return {
        ...point,
        latitude: Number(point.latitude),
        longitude: Number(point.longitude),
      };
    });

    return response.json(pointsMapped);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    point.latitude = Number(point.latitude);
    point.longitude = Number(point.longitude);

    return response.json({ point, items });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image:
        'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point, ['id']);

    const point_id = insertedIds[0].id;

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
      items,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    await trx('points').where({ id }).update(point, ['id']);

    const point_id = id;

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').where({ point_id }).del();

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id,
      ...point,
      items,
    });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const trx = await knex.transaction();

    await trx('point_items').where({ point_id: id }).del();

    await trx('points').where({ id }).del();

    await trx.commit();

    return response.status(204).json();
  }
}

export default PointsController;
