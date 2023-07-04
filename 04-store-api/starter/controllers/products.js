const Product = require('../models/product');

// Hard coded filter values, good for testing static responses
const getAllProductsStatic = async (req, res) => {
  // const search = 'ab';
  // const products = await Product.find({
  //   name: { $regex: search, $options: 'i' }, // 'i' = case insensitive
  // });
  const products = await Product.find({})
    .sort('name') // finds all products and sorts them by name
    .select('name price') // only shows specific fields
    .limit(10) // limits number of records shown
    .skip(1); // skips first records by number specified. Use Skip and limit for pagination
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // select specific fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
