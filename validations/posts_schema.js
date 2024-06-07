const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const passedBody = {
   title: {
    in: ['body'],
    notEmpty(){
      errorMessage: "The title is a required field"  
    },
    isString(){
        errorMessage: "The title must be a String"
    },
    isLength(){
        options: {min:1}
        errorMessage: "The length of this title is too short"
    },
    isLength(){
        options: {max:100}
        errorMessage: "The length of this title is too length - max length is 255 chars"
    }
    
   },
   content:{
    in: ['body'],
    notEmpty(){
        errorMessage: "The content is a required field"  
      },
      isString(){
          errorMessage: "The content must be a String"
      },
      isLength(){
          options: {min:1}
          errorMessage: "The length of this content is too short"
      },
   },
   published:{
    in: ['body'],
    notEmpty(){
        errorMessage: "You must specify if this post is already published or not"
    },
    isBoolean(){
        errorMessage: "This field only accepts true or false"
    }
   },
   categoryId:{
    in: ['body'],
    isInt(){
        options: {allow_leading_zeroes: false}
        errorMessage: "The category ID must be an integer"
    },
    custom: {
        options: async (value) => {
            const matchingId = await prisma.category.findUnique({
                where: {id: value}
            })
            if(!matchingId){
                throw new Error(`There's no ID as ${value}.`)
            }
            return true;
        }
    }
   },
   tags:{
    notEmpty(){
    errorMessage: "You must include at least one tag"
    },
    isArray(){
        errorMessage: "Tags must be passed as array of one or multiple ID"
    },
    custom:{
        options: async (values) => {
            if(values.length === 0){
                return true;
            }

            const checkIntegers = values.find(i => isNaN(parseInt(i)));
            if(checkIntegers){
                throw new Error ("One or more IDs are not integers")
            }

            const tagsIds = await prisma.tag.findMany({
                where: {id: {in: values}}
            })
            if(tagsIds.length < values.length){
                throw new Error('One or more of the passed IDs are not present in the database.')
            }
            return true;
        }
    }
   }

}

module.exports = {
    passedBody
}