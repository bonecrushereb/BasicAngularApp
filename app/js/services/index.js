module.exports = function(app) {
  require('./sp_store')(app);
  require('./sp_handle_error')(app);
  require('./sp_resource')(app);
};
