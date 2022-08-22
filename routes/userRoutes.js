import express  from 'express';

const Router =  express.Router()

Router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

export default Router;
