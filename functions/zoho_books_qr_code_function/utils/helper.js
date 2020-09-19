const constants = require('./constants');
const axios = require('axios');
const querystring = require('querystring');

exports.getValueFromDB = {
	item: async (capp, item_id, fallback = undefined) => {
		let item = await capp
			.zcql()
			.executeZCQLQuery(`SELECT * FROM ${constants.items_table_name} where item_id='${item_id}'`)
			.then((rows) => rows[0])
			.catch(() => null);
		if (item == null || item == undefined) {
			return fallback;
		}
		return item[constants.items_table_name];
	},
	codes: async (capp, item_id, fallback = undefined) => {
		let codes = await capp
			.zcql()
			.executeZCQLQuery(
				`SELECT * FROM ${constants.qrcodes_table_name} where item_id='${item_id}'`
			)
			.then((rows) => rows)
			.catch(() => null);
		if (codes == null || codes == undefined) {
			return fallback;
		}
		return codes;
	}
};

exports.insert = {
	item: async (capp, item) => {
		return capp
			.datastore()
			.table(constants.items_table_name)
			.insertRow(item);
	},
	codes: async (capp, codes) => {
		return capp
			.datastore()
			.table(constants.qrcodes_table_name)
			.insertRows(codes);
	},
}

exports.update = {
	item: async (capp, item) => {
		return capp
			.datastore()
			.table(constants.items_table_name)
			.updateRow(item);
	},
	zohoItem: async (item) => {
		return axios.post("https://accounts.zoho.com/oauth/v2/token", querystring.stringify({
			// code: code,
			refresh_token: constants.REFRESH_TOKEN,
			client_id: constants.CLIENT_ID,
			client_secret: constants.CLIENT_SECRET,
			redirect_uri: constants.REDIRECT_URL,
			grant_type: "refresh_token",
			// grant_type: "authorization_code",
			scope: "ZohoBooks.fullaccess.all",
			state: 'token'
		}), ).then(response => {
			let token = response.data.access_token
			return axios.put("https://books.zoho.com/api/v3/items/"+item.item_id, {
				sku: item.qr_code
			}, {
				params: {
					organization_id: constants.organization_id
				},
				headers: {
					'Authorization': 'Zoho-oauthtoken '+token,
				}
			}).then(response => {

			}).catch(err => {
				res.send("Error")
			})
		}).catch(err => {
			res.send("Error")
		})

	},
}
