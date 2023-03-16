const { downloadImage } = require("../../utils/download");

const { User, Product } = require('../../services/scrapper/vinted/vinted.js');

const { getUserID } = User;
const { getAllProductUser } = Product;

async function republish(req, res) {
    try {
      const { token, products } = req.body;
    
      const cookie = `_vinted_fr_session=${token};`;
      const idOfUser = await getUserID({ cookie });
    
      let productsOfUser = await getAllProductUser({ cookie, userid: idOfUser });
      productsOfUser = productsOfUser.items.filter(obj => products.includes(obj.id));
  
      const downloadPromises = [];
      for (const product of productsOfUser) {
        for (const photo of product.photos) {
          downloadPromises.push(
            downloadImage({
              url: photo.full_size_url,
              path: __dirname + "../../../../cache/" + photo.id + ".jpeg",
            })
          );
        }
      }
      await Promise.all(downloadPromises);

      res.status(200).json(productsOfUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

async function remove(req, res){
  try {
    const { token, product } = req.body;


  } catch(error){

  }
}

module.exports = { republish, remove }
