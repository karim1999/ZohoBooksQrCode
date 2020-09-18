const catalyst = require('zcatalyst-sdk-node');
const helper = require('../utils/helper');
const constants = require('../utils/constants');

module.exports = (app) => {
	app.get('/item/:id', async (req, res) => {
		const capp = catalyst.initialize(req);
		const item_id = req.params.id;

		let item = await helper.getValueFromDB.item(capp, item_id);
		if(item){
			console.log("yes")
			item.codes= await helper.getValueFromDB.codes(capp, item_id).catch(err => {
				console.log(err)
			})
		}
		return res.status(200).json({
			item
		});
	});

	app.post('/item', async (req, res) => {
		const capp = catalyst.initialize(req);
		const item = req.body.item;
		let finalItem= {};
		if(item.ROWID){
			finalItem= await helper.update.item(capp, item);
		}else{
			finalItem= await helper.insert.item(capp, item);
		}
		return res.status(200).json({
			item: finalItem
		});
	});

	app.post('/codes', async (req, res) => {
		const capp = catalyst.initialize(req);
		const codes = req.body.codes;

		await helper.insert.codes(capp, codes);
		return res.status(200).json({
			msg: "done"
		});
	});
};
