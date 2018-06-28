module.exports = minimum => {
  return function(req, res, next) {
    console.log(minimum);
    if (req.user.credits < minimum) {
      return res
        .status(403)
        .send({ error: `You do not have enough credits(${minimum})!` });
    }
    next();
  };
};
