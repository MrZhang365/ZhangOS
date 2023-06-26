/**
 * 使用ZHR向服务器发送HTTP请求，支持GET和POST
 * @param {String} url 请求地址
 * @param {String} method 请求方法
 * @param {any|undefined} data 请求体，可以不提供，提供undefined则忽略
 * @param {Object} headers 请求头，可以不提供
 * @returns {Promise} 一个Promise。如果响应头的Content-Type是application/json，则自动解析响应文本。
 */

window.zhr = (url, method, data = undefined, headers = {}) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = () => {
            if (xhr.status !== 200) {
                rej(`HTTP Status ${xhr.status} ${xhr.statusText}`)
            }else {
                if (xhr.getResponseHeader('Content-Type') === 'application/json') return res(JSON.parse(xhr.responseText))
                res(xhr.responseText)
            }
        }
        Object.keys(headers).forEach((h) => {
            xhr.setRequestHeader(h, headers[h])
        })
        if (typeof data !== 'undefined') {
            xhr.send(data)
        }else {
            xhr.send()
        }
    })
}

/**
 * 使用ZHR向指定URL发送一个JSON格式的POST请求，会自动设置Content-Type为application/json
 * @param {String} url 目标URL
 * @param {Object} obj 要发送的JSON数据
 * @param {Object} headers 可选的自定义请求头
 * @returns {Promise} 一个Promise
 */
window.zhr.json = (url, obj, headers = {}) => {
    // 使用POST方法发送一个JSON
    const j = JSON.stringify(obj)
    return window.zhr(url, 'POST', j, {
        'Content-Type': 'application/json',
        ...headers,
    })
}

function $(id) {
    return document.getElementById(id)
}

async function changeUser(username, password) {
    try {
        await zhr.json('../system/user-change', {
            username, password,
        })
        mdui.alert('用户信息修改成功', '恭喜', undefined, {
            confirmText: '关闭'
        })
    }catch (e) {
        mdui.alert('用户信息修改失败', '出错了！', undefined, {
            confirmText: '关闭'
        })
    }
}

$('user-change').onsubmit = (e) => {
    changeUser(e.target.username.value, e.target.password.value)
    return false
}