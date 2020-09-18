const constants = require('./constants');

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
}
