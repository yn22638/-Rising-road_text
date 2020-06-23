//ajax封装

function myAjax(method, url, next) {
    //引用封装
    // let xhr = new XMLHttpRequest();
    // xhr.open(method, url);
    // xhr.send()
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         next(xhr.responseText);
    //     }
    // }
}
// document.querySelector("button").onclick = async function() {
//     let p = myajax("get", "data");
//     p.then(function(data) {
//         alert(data);
//     })
// }

// //引用promise封装
function myAjax(method, url) {
    //请求成功
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = function() {
            console.log(xhr.readyState, xhr.status)
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject("获取数据失败")
                }
            }
        }
    })


    //readyState请求失败，因为状态变化
    // return new Promise(function(resolve, reject) {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open(method, url);
    //     xhr.send(); //可以向后台传输数据
    //     xhr.onreadystatechange = function() {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             resolve(xhr.responseText);
    //         }
    //     }
    //     reject("获取数据失败")
    // })
}