const axios = require('axios');

class userManager {
    static async login({ username, password }) {
        try {
            const decoded = Buffer.from(username + ":" + password, 'utf8').toString('base64');
            const config = {
                method: 'get',
                url: new URL('/ocs/v2.php/core/getapppassword', process.env.NEXTCLOUD_URL).href,
                headers: {
                    'OCS-APIRequest': 'true',
                    'Authorization': 'Basic ' + decoded,
                }
            };

            await axios(config);

            return { status: true, data: "Giriş Başarılı", login: true, token: decoded }
        } catch (error) {
            if (error.response != undefined && error.response.status == 401) {
                return ({ status: true, data: "şifre yanlış", login: false });
            } else {
                return ({ status: false, data: "Hata", login: false, message: error });
            }
        }
    }
}

module.exports = userManager;