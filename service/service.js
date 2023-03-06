const Contact = require("./schemas/contact");

const getAllContacts = async () => {
  return Contact.find();
};

const getSingleContact = async (id) => {
  return Contact.findOne({ _id: id });
};

const postContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove(id);
};

const changeContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const changeFavoritContact = async (id, fav) => {
  return Contact.findByIdAndUpdate({ _id: id }, fav, { new: true });
};

module.exports = {
  getAllContacts,
  getSingleContact,
  postContact,
  removeContact,
  changeContact,
  changeFavoritContact,
};
