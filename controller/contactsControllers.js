const {
  postSchema,
  putSchema,
  changeFavSchema,
} = require("../routes/api/contactsValidate");
const {
  getAllContacts,
  getSingleContact,
  postContact,
  removeContact,
  changeContact,
  changeFavoritContact,
} = require("../service/contactService");

const getContactController = async (req, res, next) => {
  try {
    const results = await getAllContacts();
    res.status(200).json({
      message: "succes",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const results = await getSingleContact(contactId);
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
  try {
    if (!reqValidate.error) {
      const data = await postContact(body);
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
    }
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const changeContactController = async (req, res, next) => {
  const reqValidate = putSchema.validate(req.body);
  const body = req.body;
  const { contactId } = req.params;
  try {
    if (!reqValidate.error) {
      const data = await changeContact(contactId, body);
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
  const { contactId } = req.params;
  try {
    if (!reqValidate.error) {
      const data = await changeFavoritContact(contactId, body);
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
  try {
    const results = await removeContact(contactId);
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
