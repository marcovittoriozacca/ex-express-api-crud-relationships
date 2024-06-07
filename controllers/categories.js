const prisma = require('../prisma/prismaClient.js');

const index = async (req, res, next) => {

    try{
        const allCategories = await prisma.category.findMany()
        
        res.json({
            status:200,
            success:true,
            categories: allCategories
        })
    }catch(err){
        return next(err);
    }
    

}


module.exports = {
    index,
}