import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import PointsFilterController from './controllers/PointsFilterController';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();
const pointsFilterController = new PointsFilterController();

routes.get('/', (request, response) => {
  return response.json({
    application: 'Ecoleta API',
    developer: 'Wesley Feitosa',
    github: 'https://github.com/wesleyfeitosa',
  });
});

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.put('/points/:id', pointsController.update);
routes.delete('/points/:id', pointsController.delete);

routes.get('/points-filter', pointsFilterController.show);

export default routes;
