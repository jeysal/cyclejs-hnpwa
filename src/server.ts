import express from 'express';
import { join as joinPath } from 'path';

const server = express();

// serve static content
server.use(express.static(joinPath(__dirname, 'static')));

server.listen(process.env.PORT || 8080);
