import * as express from 'express';
import uiRouter from './routes/ui';
import graphqlRouter from './routes/graphql';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/graphql', graphqlRouter);
app.use('*', uiRouter);
app.use(errorMiddleware);

export default app;
