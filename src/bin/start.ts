import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import bootstrap from '../app';

const options = {
  key: fs.readFileSync(path.join(__dirname, '../../ssl/2_www.barteam.cn.key')),
  cert: fs.readFileSync(
    path.join(__dirname, '../../ssl/1_www.barteam.cn_bundle.crt')
  ),
};

if (process.env.MODE === 'production') {
  bootstrap('production').then((server) => {
    const httpsServer = https.createServer(options, server.callback());
    httpsServer.listen(2992);
  });
} else {
  bootstrap().then((server) => {
    const httpServer = http.createServer(server.callback());
    httpServer.listen(2992);
  });
}
