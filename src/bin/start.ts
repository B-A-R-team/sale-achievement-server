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

const PORT = 2992;
if (process.env.RUN_MODE === 'production') {
  console.log('# 生产环境 #');
  bootstrap('production').then((server) => {
    const httpsServer = https.createServer(options, server.callback());
    httpsServer.listen(PORT);
  });
} else {
  bootstrap().then((server) => {
    console.log('# 开发环境 #');
    const httpServer = http.createServer(server.callback());
    httpServer.listen(PORT);
  });
}
