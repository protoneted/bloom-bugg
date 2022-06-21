const constants = require('../config/constants');

exports.pagination = (page = 1) => {
  page = parseInt(page);
  if (typeof page == undefined || page < 0 || page === 'undefined')
    page = 1;

  let offset = (page - 1) * constants.PER_PAGE;
  console.log(page + "page");
  console.log(offset + "offset");

  return {
    'offset': offset,
    'limit': constants.PER_PAGE
  };
}