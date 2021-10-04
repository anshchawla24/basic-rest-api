const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')





//get all route

router.get('/', getSubscriber, async (req,res) => {

    try{

        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch (err) {

        res.status(500).json({message: err.message})

    }


})

//getting one route

router.get('/:id', (req,res) => {

    res.json(res.subscriber)



})

//creating one route

router.post('/', getSubscriber, async (req,res) => {

    const subscriber = new Subscriber({

        name: req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })

    try{


        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)


    }
    catch (err){

        res.status(400).json({error : err.message})      
    }


})

//updating one route

router.patch('/:id',getSubscriber, async (req,res) => {

    if(req.body.name != null)
    {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null)
    {
        res.subscriber.subscribedToChannel= req.body.subscribedToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        
    } catch (err) {
        res.status(400).json({message : err.message})
        
    }


})

//deleting route
router.delete('/:id', getSubscriber,  async (req,res) => {

    try{

        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})


        
    }

    catch(err){

        res.status(500).json({message: err.message})
        

    }


})

async function getSubscriber(req,res,next){

    try{

        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null)
        {
            return res.status(404).json({message : 'Cannot find subscriber'})


        }


    }

    catch(err){

        return res.status(500).json({message : err.message})




    }
    res.subscriber = subscriber
    next()





}



module.exports = router;


