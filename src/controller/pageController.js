const photoController = require('../controller/photoController');

exports.getIndexPage = async (req,res) => {
	const results= await photoController.getAllPhotos(9,1);
	
	res.render("index", {
		page_name: 'index',
		results:results,
	  });
};
exports.getAboutPage = (req,res) => {
	res.render("about", {
		page_name: 'about',
	  });
};
