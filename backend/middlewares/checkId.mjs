import { isValidObjectId } from "mongoose";



function checkId(req, res, next){
    if(isValidObjectId(req.params.id)){
        next();
    }else{
        res.status(404).send({message: "Invalid Id"});
    }
}


export default checkId;

