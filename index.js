const http = require("http");
const { unescape } = require("querystring");

let server = http.createServer((res, rep) => {
  var dataForm = "";
  var user = {
    name: "Phuc",
    pass: "123",
  };
  var formLogin = `<form method="post" action="http://127.0.0.1:8888/">
  Username: <input type="text" name="username" value=""/> <br/> <br/>
  Password: <input type="post" name="password" value=""/> <br/> <br/>
  <input type="submit" name="btn" value="Login"/>
</form>`;

  var loginTrue = false;

  res.on("data", function (data) {
    dataForm = data + "";
    //chyuyen ve kieu string

    dataForm = getQueryParams(dataForm);

    loginTrue =
      dataForm.username == user.name && dataForm.password == user.pass;
  });
  function getQueryParams(data) {
    const paramArr = data.split("&");
    const params = {};
    paramArr.map((param) => {
      const [key, val] = param.split("=");
      params[key] = decodeURIComponent(unescape(val));
    });
    return params;
  }
  res.on("end", function (data) {
    setTimeout(() => {
      console.log(dataForm.username);
      console.log(dataForm.password);

      rep.statusCode = 200;
      //trang thai 200 thanh cong 400 800 that bai

      rep.setHeader("Content-Type", "text/html");
      //                                         duoi html
      if (loginTrue) {
        rep.end("login thanh cong");
      } else {
        rep.end(formLogin);
      }
    }, 0);
  });
});

server.listen(8888, "127.0.0.1");
