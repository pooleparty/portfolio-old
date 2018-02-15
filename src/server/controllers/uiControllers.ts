import { Request, Response } from 'express';
import renderer from '../utils/renderer';
import logger from '../utils/logger';

const uiRootController = (req: Request, res: Response) => {
  const url = req.baseUrl;
  logger.info('Calling ui controller with path', url);

  try {
    const { html, head } = renderer(url);

    res.render('index', { html, head });
  } catch (error) {
    logger.error('Rendering error view', error);
    res.render('error', { html: '', error });
  }
};

export default uiRootController;
