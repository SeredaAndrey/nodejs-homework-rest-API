const Contact = require("./schemas/contactSchema");

const getAllContacts = async (userId, { skip, limit, favorite }) => {
  if (favorite) {
    return Contact.find({ owner: userId, favorite: favorite })
      .select({ __v: 0, owner: 0 })
      .skip(skip)
      .limit(limit);
  } else
    return Contact.find({ owner: userId })
      .select({ __v: 0, owner: 0 })
      .skip(skip)
      .limit(limit);
};

const getSingleContact = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const postContact = async (body, userId) => {
  return Contact.create({ ...body, owner: userId });
};

const removeContact = async (id, userId) => {
  return Contact.findOneAndRemove({ _id: id, owner: userId });
};

const changeContact = async (id, body, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, body, {
    new: true,
  });
};

const changeFavoritContact = async (id, fav, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, fav, {
    new: true,
  });
};

module.exports = {
  getAllContacts,
  getSingleContact,
  postContact,
  removeContact,
  changeContact,
  changeFavoritContact,
};
