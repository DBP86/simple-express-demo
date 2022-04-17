const Parameter = require('parameter');

const parameter = new Parameter();

const validate = (rule) => {
  return (req, res, next) => {
    const data = { ...req.params, ...req.body, ...req.query };
    const params = {};
    Object.keys(rule).forEach((key) => {
      if (data.hasOwnProperty(key)) params[key] = data[key];
    })
  
    const err = parameter.validate(rule, params);
    if (err) {
      res.statusCode = 400;
      return next(`validation error: '${err[0].field}' ${err[0].message}`);
    }
  
    req.params = params;
    
    return next();
  }
};

module.exports = validate;
