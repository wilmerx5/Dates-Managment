import services from '../models/ServiceModel.js'
import { handleNotFound, validateObjectId } from '../utils/index.js'
const getServices= async (req,res)=>{
    
    try{

        const response = await services.find()
        res.json({data:response})
    }
    catch(er){
        res.status(403).json({
            msg:er.message
        })
    }

}

const getService=async(req,res)=>{

    const  {id} = req.params

   if( validateObjectId(id,res)) return

    const service = await services.findById(id)

    if(!service){
        return  handleNotFound(res)
       
    }
    res.json(service)
}

const updateService=async(req,res)=>{

    const  {id} = req.params
    const {body} = req 

    if( validateObjectId(id,res)) return


    const service = await services.findById(id)

    if(!service){
       return  handleNotFound(res)
    }
    service.name = body.name
    service.price = body.price

    try{

        await service.save()

        res.json({
            msg:"update success"
        })
    }
    catch(e){
        console.log(e)
    }

}
const createServices=async(req,res)=>{
  if(Object.values(req.body).includes('')){
   return res.status(400).json({
    msg:'error'
   })

  }
  try{
   const service=  new  services(req.body)

   const result = await  service.save() 

   res.json(result)

  }
  catch(e){

      res.status(403.).json({
        msg:e.message
      })
  }
}

const deleteService=async(req,res)=>{



    const {id} =req.params
   if( validateObjectId(id,res)) return

   const service = await services.findById(id)

   if(!service){
      return  handleNotFound(res)
   }

   try{

       await services.deleteOne()
       res.json({
        msg:'Deleted'
       })
   }
   catch(e){
    res.status(400).json({
        msg:e.message
    })
   }
}
export {
    createServices, deleteService, getService, getServices, updateService
}

