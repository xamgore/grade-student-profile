# grade-student-profile

In our university we develop a system for teachers & students, that allows both of them to controll their rates. For example, student can sign in his account, check out the academic progress, connect with teachers, etc. So this project is just a frontend part for that stuff.

<img src="http://i.imgur.com/2RCNLdZ.png" alt="summary" width="285"/>
<img src="http://i.imgur.com/ExJIvYq.png" alt="discipline" width="285"/>
<img src="http://i.imgur.com/BoRaFth.png" alt="settings" width="285"/>

## Build Setup

``` bash
npm install
npm run me     # run mock api server and
               # dev server at 0.0.0.0:3000

npm run build  # if you wanna get a production ready distro
```

## Tests

```bash
npm run test
```

After unit tests are passed, [browserstack](http://browserstack.com) starts e2e tests in all major browsers. And if something fails, we can watch a video with error happening. In case we want to fix a bug, we can use the [Live](https://www.browserstack.com/start) tool. Thanks browserstack for giving us a free account!

[<img src="https://d3but80xmlhqzj.cloudfront.net/production/images/static/logo.svg" alt="" width="250">](http://browserstack.com)
