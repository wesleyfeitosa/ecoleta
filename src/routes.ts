import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import PointsFilterController from './controllers/PointsFilterController';

const routes = express.Router();
const upload = multer(multerConfig);

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

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.required(),
        latitude: Joi.required(),
        longitude: Joi.required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false },
  ),
  pointsController.create,
);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.put('/points/:id', pointsController.update);
routes.delete('/points/:id', pointsController.delete);

routes.get('/points-filter', pointsFilterController.show);

export default routes;
