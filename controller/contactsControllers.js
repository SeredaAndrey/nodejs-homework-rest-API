const {
  postSchema,
  putSchema,
  changeFavSchema,
  getRequestValidate,
} = require("../service/Validate/contactsValidate");
const {
  getAllContacts,
  getSingleContact,
  postContact,
  removeContact,
  changeContact,
  changeFavoritContact,
} = require("../service/contactService");

const getContactController = async (req, res, next) => {
  const reqValidate = getRequestValidate.validate(req.query);
  const _id = req.user._id;
  let { page = 1, limit = 10, favorite = null } = req.query;
  limit = parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;
  try {
    if (!reqValidate.error) {
      const results = await getAllContacts(_id, { skip, limit, favorite });
      res.status(200).json({
        message: "succes",
        code: 200,
        data: {
          contacts: results,
        },
        page: page,
        limit: limit,
      });
    } else
      res.status(400).json({
        code: 400,
        message: reqValidate.error,
      });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const _id = req.user._id;
  try {
    const results = await getSingleContact(contactId, _id);
    if (results) {
      res.status(200).json({
        message: "succes",
        code: 200,
        data: {
          contact: results,
        },
      });
    } else {
      res.status(404).json({
        message: "Not found",
        code: 404,
      });
    }
  } catch (e) {
    res.status(404).json({ message: e });
    next(e);
  }
};

const addContactController = async (req, res, next) => {
  const reqValidate = postSchema.validate(req.body);
  const body = req.body;
  const _id = req.user._id;
  try {
    if (!reqValidate.error) {
      const data = await postContact(body, _id);
      if (data) {
        res.status(201).json({
          message: "succes",
          code: 201,
          data: {
            contact: data,
          },
        });
      } else {
        res.status(400).json({
          message: `a contact with mail ${body.email} alredy exists`,
          code: 400,
        });
      }
    } else
      res.status(400).json({
        code: 400,
        message: reqValidate.error,
      });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const changeContactController = async (req, res, next) => {
  const reqValidate = putSchema.validate(req.body);
  const body = req.body;
  const _id = req.user._id;
  const { contactId } = req.params;
  try {
    if (!reqValidate.error) {
      const data = await changeContact(contactId, body, _id);
      if (data) {
        res.status(200).json({
          message: "succes",
          code: 200,
          data: {
            contact: data,
          },
        });
      } else {
        res.status(404).json({
          message: "Not found",
          code: 404,
        });
      }
    } else {
      res.status(400).json({
        code: 400,
        message: reqValidate.error,
      });
    }
  } catch (e) {
    res.status(404).json({ message: e });
    next(e);
  }
};

const changeFavoritContactController = async (req, res, next) => {
  const reqValidate = changeFavSchema.validate(req.body);
  const body = req.body;
  const _id = req.user._id;
  const { contactId } = req.params;
  try {
    if (!reqValidate.error) {
      const data = await changeFavoritContact(contactId, body, _id);
      if (data) {
        res.status(200).json({
          message: "succes",
          code: 200,
          data: {
            contact: data,
          },
        });
      } else {
        res.status(404).json({
          message: "Not found",
          code: 404,
        });
      }
    } else {
      res.status(400).json({
        code: 400,
        message: reqValidate.error,
      });
    }
  } catch (e) {
    res.status(404).json({ message: e });
    next(e);
  }
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const _id = req.user._id;
  try {
    const results = await removeContact(contactId, _id);
    if (results) {
      res.status(200).json({
        message: "contact deleted",
        code: 200,
        data: {
          message: results,
        },
      });
    } else {
      res.status(404).json({
        message: "Not found",
        code: 404,
      });
    }
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

module.exports = {
  getContactController,
  getContactByIdController,
  addContactController,
  changeContactController,
  removeContactController,
  changeFavoritContactController,
};
