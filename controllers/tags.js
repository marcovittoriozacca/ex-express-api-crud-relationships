const prisma = require('../prisma/prismaClient.js');

const store = async (req, res, next) => {

    const { name } = req.body;

    try{
        const newTag = await prisma.tag.create({data:{name}});
        res.json({
            status:200,
            success:true,
            new_tag: newTag
        });
    }catch(err){
        next(err);
    }
}


module.exports = {
    store
}