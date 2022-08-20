const axios = require('axios');

class chatManager {
    static async getUsers({ nexttoken }) {
        //http://localhost:8081/ocs/v2.php/apps/spreed/api/v4/room
        try {
            const config = {
                method: 'get',
                url: new URL('/ocs/v2.php/apps/spreed/api/v4/room', process.env.NEXTCLOUD_URL).href,
                headers: {
                    'OCS-APIRequest': 'true',
                    'Authorization': 'Basic ' + nexttoken,
                }
            };

            let result = await axios(config);

            return { status: true, data: result.data.ocs.data }
        } catch (error) {
            console.log(error);
            return { status: false, data: [] }
        }
    }

    static async getMessages({ chatToken, nexttoken }) {
        //http://localhost:8081/ocs/v2.php/apps/spreed/api/v4/room
        console.log(chatToken);
        console.log(nexttoken);
        try {
            let data = JSON.stringify({
                "lookIntoFuture": 0,
                "limit": 100
            });

            console.log(new URL('/ocs/v2.php/apps/spreed/api/v1/chat/' + chatToken, process.env.NEXTCLOUD_URL).href);

            const config = {
                method: 'get',
                url: new URL('/ocs/v2.php/apps/spreed/api/v1/chat/' + chatToken, process.env.NEXTCLOUD_URL).href,
                headers: {
                    'OCS-APIRequest': 'true',
                    'Authorization': 'Basic ' + nexttoken,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            let result = await axios(config);

            return { status: true, data: result.data.ocs.data }
        } catch (error) {
            return { status: false, data: [] }
        }
    }

}

module.exports = chatManager;
