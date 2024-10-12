
//By Doing this we don't need to repeat try-catch blocks in every route
const asyncHandler = (fn)=>(req, res, next) =>{
     Promise.resolve(fn(req, res, next)).catch((err)=>{
        res.status(500).json({ message: err.message})
     })
}



export default asyncHandler;