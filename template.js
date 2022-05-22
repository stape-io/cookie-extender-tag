const setCookie = require('setCookie');
const getCookieValues = require('getCookieValues');

if (data.cookies && data.cookies.length > 0) {
    data.cookies.forEach(function (cookieObject) {
        let cookies = getCookieValues(cookieObject.name, true);

        if (cookies && cookies.length > 0) {
            cookies.forEach(function (cookieValue) {
                setCookie(cookieObject.name, cookieValue, {
                    domain: 'auto',
                    path: '/',
                    samesite: 'Lax',
                    secure: true,
                    'max-age': cookieObject.lifetime,
                    httpOnly: false
                }, true);
            });
        }
    });
}

data.gtmOnSuccess();
