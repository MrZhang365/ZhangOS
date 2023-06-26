# ZhangOS  
欢迎使用 ZhangOS，一个“操作系统”  
ZhangOS类似于宝塔面板，但是允许您灵活地开发其子程序，就像一个“操作系统”  

# 部署  
1. 准备好 `Node.js` 环境  
2. 克隆本仓库并切换到本仓库目录下  
3. 执行 `npm i` 来安装依赖  
4. 将 `config` 目录下的 `_config.json` 重命名为 `config.json`  
5. 将 `config.json` 的 `port` 修改为你喜欢的端口号（默认为 `8765`）  
6. 执行 `node main.js` 来启动程序  
7. 在浏览器中打开 `http://服务器IP:你设置的端口` 访问 ZhangOS，浏览器会弹出登录框，默认用户名为 `admin`，默认密码为 `1234`。**（注意：请务必在`我的应用 > 设置 > 修改用户信息`里修改用户名和密码）**  
8. 尽情使用吧！  

# 注意事项  
- 本项目许可证为 Apache-2.0  
- **请务必在`我的应用 > 设置 > 修改用户信息`里修改用户名和密码**