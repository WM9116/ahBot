# ahBot
安徽电信流量查询 tg bot   
!!function only!!

### 公共Bot
[@aahwctBot](https://t.me/aahwctBot)

### 使用
自行部署环境,调用main函数传入Bot消息数据.  
Tg Bot查询命令设为 /start

### 参数
> Token => Tg Bot Token

> AdministratorId => Tg账号id

> openid => 安徽电信小程序里抓取

> main函数body => Tg Bot消息数据

### 参数openid获取方式
#### 方式1: 抓包
对微信抓包,打开安徽电信小程序,打开套餐余量
筛选 https://wx.ah.189.cn/wxws/xcxahwx/detailInfo.do

![抓包](https://github.com/publzs/ahBot/blob/main/img/Screenshot_HttpCanary.png)

#### 方式2: 读取微信小程序Cookie
打开 /data/user/0/com.tencent.mm/  目录下以app_xwalk_开头且日期最新的文件夹,打开里面的 Default 文件夹,用Sqlite Master打开里面的 Cookies 文件.
打开表 cookies 
![抓包](https://github.com/publzs/ahBot/blob/main/img/cookies.png)
进行如下筛选
![抓包](https://github.com/publzs/ahBot/blob/main/img/filter.png)
打开唯一的一条结果,其中的 value 即openid

### 依赖
axios

### 关于代理
此接口需使用大陆ip调用,所以使用百度(直连)代理.  
ips 为 cloudnproxy.baidu.com 的解析ip.
