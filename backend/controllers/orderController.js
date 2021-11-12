import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//Create new Order POST api/order PRIVATE

const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    // console.log(req.body)
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)

    }

})


//Get order by id  GET api/order/:id PRIVATE

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404);
        throw new Error('Order Not Found')
    }

})


//Update order to paid GET api/order/:id/pay PRIVATE

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404);
        throw new Error('Order Not Found')
    }

})


//Get logged in user Order GET api/order/myorders PRIVATE

const getMyOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
   

})
export { addOrderItems, getOrderById, updateOrderToPaid,getMyOrder };