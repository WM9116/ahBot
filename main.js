const axios = require('axios')

//botToken
const Token = ''

//yourId
const AdministratorId = ''

//抓取的openid
const openid = ''

//代理host
let ips = [
    '180.97.104.168',
    '180.97.93.202',
    'cloudnproxy.baidu.com',
    '14.215.179.244',
    '220.181.33.174',
    '220.181.111.189',
    '220.181.7.1',
    '36.152.45.97',
    '110.242.70.68',
    '157.0.148.53'
]

const sendMessage = (text,log) => {
    axios.get(`https://api.telegram.org/bot${Token}/sendMessage`, {
        params: {
            'chat_id': AdministratorId,
            'text': text
        }
    }).then(_ => {
        console.log(log)
    }).catch(err => console.log(err))
}

const tryIp = async (ip) => {
    let now = new Date()
    let year = now.getFullYear().toString()
    let mouth = (now.getMonth() + 1).toString().padStart(2,'0')

    let date = `${year}${mouth}`
    let res
    let config = {
        url: 'http://wx.ah.189.cn/wxws/xcxahwx/detailInfo.do',
        method: 'POST',
        headers: {
            'User-Agent': 'baiduboxapp',
            'X-T5-Auth': 'ZjQxNDIh',
            'Host': 'wx.ah.189.cn',
            'Content-Length': '87',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `openid=${openid}&dateTime=${date}`,
        timeout: 6000,
        proxy: {
            protocol: 'http',
            host: ip,
            port: 443
        }
    }

    try {
        res = await axios(config)
    } catch {
        res = 'err'
    }

    return new Promise(((resolve, reject) => {
        if (res === 'err') {
            reject('请求失败')
        } else {
            if (res?.data?.object) {
                resolve([res.data.object, ip])
            } else {
                reject('请求成功,但数据出错')
            }
        }
    }));
}

const getInfo = async () => {
    let res
    try {
        res = await Promise.any(ips.map(value => tryIp(value)))
    } catch {
        res = 'err'
    }
    return res
}

const ptllInfo = (ptll) => {
    let len = Object.keys(ptll).length
    let total = 0
    let left = 0
    for (let i = 0; i < len; i++) {
        total += Number(ptll[i]['RATABLE_TOTAL'])
        left += parseFloat(ptll[i]['RATABLE_LEFT'])
    }
    let t = (total / 1024).toFixed(2)
    let l = (left / 1024).toFixed(2)
    return (l + 'G/' + t + 'G')
}
const dxllInfo = (dxll) => {
    return (dxll[0]['RATABLE_USED'] / 1024).toFixed(2) + 'G'
}

const main = (body) => {
    if (!(body?.['message']?.['text'])) {
        return;
    }
    let {message} = body
    if (message['chat']['id'] !== AdministratorId) return;

    if (message['text'] === '/start') {
        getInfo().then(res => {
            if (res === 'err') {
                sendMessage('err','errrrr')
                return;
            }
            let {ptll, dxll} = res[0]
            console.log(res[1])
            let ptStr = ptllInfo(ptll)
            let dxStr = dxllInfo(dxll)
            sendMessage(`➤➤ ${ptStr} -- ${dxStr}`,`ip>> ${res[1]}`)
        })
    }
}
module.exports = main;