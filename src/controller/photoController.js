const Photo = require('../models/Photo');
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const uploadedUrl = '/uploads/';

exports.getAllPhotos = async (perPage, pageNumber) => {
  const options = {
    page: pageNumber,
    limit: perPage,
  };
  const result = await Photo.paginate({}, options);
  return result;
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findOne({ slug: req.params.slug });
  res.render('photo', { page_name: 'photo', photo: photo });
};

exports.editPhoto = async (req, res) => {
  const photo = await Photo.findOne({ slug: req.params.slug });
  res.render('photoFrmEdit', { page_name: 'photo', photo: photo });
};

exports.savePhoto = async (req, res) => {
  /*  console.log(req.files);*/

  const p = await Photo.findOne({ slug: req.body.slug });
  p.title = req.body.title;
  p.description = req.body.description;

  if (req.files) {
    try {
      const uploadImage = req.files.img;
      const imagePath = appDir + '\\public\\uploads\\' + uploadImage.name;
      const imageUrl = uploadedUrl + '' + uploadImage.name;
      uploadImage.mv(imagePath, async () => {
        p.image = imageUrl;
        await p.save();
        res.redirect('/');
      });
    } catch (error) {
      res.status(400).json({ status: 'fail', error });
    }
  } else {
    await p.save();
    res.redirect('/');
  }
};

exports.deletePhoto = async (req, res) => {
  
  await Photo.findOneAndRemove({ slug: req.params.slug });
  res.redirect('/');
};
exports.createPhoto = async (req, res) => {
  try {
    const uploadImage = req.files.img;
    const imagePath = appDir + '\\public\\uploads\\' + uploadImage.name;
    const imageUrl = uploadedUrl + '' + uploadImage.name;
    uploadImage.mv(imagePath, async () => {
      console.log(uploadImage.name);
      await Photo.create({
        ...req.body,
        image: imageUrl,
      });
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', error });
  }
};

exports.newPhoto = (req, res) => {
  res.render('../views/photoFrm.ejs', {
    page_name: '/photos/new',
    photo: new Photo(),
  });
};
