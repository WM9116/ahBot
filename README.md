# ahBot
安徽电信流量查询 tg bot   
!!function only!!

### 使用
自行部署环境,调用main函数传入Bot消息数据.  
Tg Bot查询命令设为 `/start`

### 参数
> Token => Tg Bot Token

> AdministratorId => Tg账号id

> openid => 安徽电信小程序里抓取

> main函数body => Tg Bot消息数据

### 参数openid获取方式
对微信抓包,打开安徽电信小程序,打开套餐余量
筛选 `https://wx.ah.189.cn/wxws/xcxahwx/detailInfo.do`

![alt](https://github.com/publzs/ahBot/blob/main/img/Screenshot_HttpCanary.png)


### 依赖
axios

### 关于代理
此接口需使用大陆ip调用,所以使用百度(直连)代理.  
`ips` 为 `cloudnproxy.baidu.com` 的解析ip.
