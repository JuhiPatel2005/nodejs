exports.pageNotFound = (req,res,next) => {
  res.status(404).render('error',{pageTitle: 'not found', currentPage: 'error'});
};