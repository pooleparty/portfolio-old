import { hostname } from 'os';
import app from './server/app';

app.listen(3000, () =>
  console.log(`Listening on port: http://${hostname()}:${app.get('port')}`),
);
