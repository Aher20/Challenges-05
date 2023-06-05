const { Component } = require("../models");

module.exports = {
  // GET all components
  index: async (req, res, next) => {
    try {
      const components = await Component.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: components,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET detail products
  show: async (req, res, next) => {
    try {
      const { id } = req.params;

      const component = await Component.findOne({ where: { id } });

      if (!component) {
        return res.status(404).json({
          status: false,
          message: `can't find component with id ${id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: component,
      });
    } catch (err) {
      next(err);
    }
  },

  // POST data components
  store: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          status: false,
          message: "name is required!",
          data: null,
        });
      }

      if (!description) {
        return res.status(400).json({
          status: false,
          message: "description is required!",
          data: null,
        });
      }

      const component = await Component.create({ name, description });

      return res.status(201).json({
        status: true,
        message: "success",
        data: component,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const updated = await Component.update(req.body, { where: { id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find component with id ${id}!`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleted = await Component.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find component with id ${id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });

    } catch (err) {
      next(err);
    }
  },
};
