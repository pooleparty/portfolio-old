import { Router } from 'express';
import graphqlController from '../controllers/graphqlController';

const router = Router();

// GraphiQL UI
router.get('/', graphqlController(true));

// GraphQL Server
router.post('/', graphqlController(false));

export default router;
