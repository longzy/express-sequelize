
### 项目运行命令

install dependencies:
     $ cd lanlog && npm install

run the app:
 $ DEBUG=lanlog:* npm start

 
 ### 线上部署目录
  `/home/node_project`
  
 ### pm2 线上启动
 export NODE_ENV=production && pm2 start bin/www --name lan-log
 
 ### pm2 命令
 
 pm2 list
 
 pm2 logs --timestamp
 
 #### deploy
 pm2 ecosystem
