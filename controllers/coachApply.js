const {
    getAllPending_DB,
  } = require(
    "../dataAccess/coach_apply_db",
  );

  async function getAllPending(req, res) {
    try {
      const applicationData = await getAllPending_DB();
      res.status(200);
      res.send(applicationData);
    } catch (error) {
      res.status(500);
      res.send({
        error: {
          status: 500,
          message: error.message,
          details: "Error trying to get pending coach applications from database.",
        },
      });
    }
  }

  module.exports = {
    getAllPending,
  };