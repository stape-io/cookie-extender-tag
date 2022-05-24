const setCookie = require('setCookie');
const getCookieValues = require('getCookieValues');

if (data.cookies && data.cookies.length > 0) {
    data.cookies.forEach(function (cookieObject) {
        let cookies = getCookieValues(cookieObject.name, true);

        if (cookies && cookies.length > 0) {
            cookies.forEach(function (cookieValue) {
                updateCookie(cookieObject.name, cookieValue, cookieObject.lifetime);

                if (data.createBackup) {
                    updateCookie(cookieObject.name+'_backup', cookieValue, cookieObject.lifetime);
                }
            });
        } else if (data.createBackup) {
            let backupCookies = getCookieValues(cookieObject.name+'_backup', true);

            if (backupCookies && backupCookies.length > 0) {
                backupCookies.forEach(function (cookieValue) {
                    updateCookie(cookieObject.name, cookieValue, cookieObject.lifetime);
                    updateCookie(cookieObject.name+'_backup', cookieValue, cookieObject.lifetime);
                });
            }
        }
    });
}

data.gtmOnSuccess();


function updateCookie(name, value, lifetime) {
    setCookie(name, value, {
        domain: 'auto',
        path: '/',
        samesite: 'Lax',
        secure: true,
        'max-age': lifetime,
        httpOnly: false
    }, true);
}
