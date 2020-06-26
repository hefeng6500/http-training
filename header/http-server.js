const http = require('http');
const url = require('url');
const queryString = require('querystring');

http.createServer((req, res) => {
  if (req.url === "/write") {
    res.setHeader('Set-Cookie', [`name=hefeng; domain=cookie.hefeng.com`, 'age=11; domain=baidu.com; httpOnly=true'])

    res.end('<iframe src="https://www.baidu.com/"></iframe>')
  } else if (req.url === '/read') {
    res.end(JSON.stringify(queryString.parse(req.headers.cookie, '; ', '=')))
  } else {
    res.end('Not Found')
  }
}).listen(3000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/');