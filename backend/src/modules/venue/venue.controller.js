const prisma = require('../../config/prisma');
const venuService = require('./venue.service');

const create = async(req,res,next)=>{
    try
    {
        console.log(req.files);
        console.log(req.body);
        const result = await venuService.create(req.body,req.user.userId,req.files);
        return res.status(201).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const getAll = async (req,res,next)=>{
    try
    {
        const result = await venuService.getAll(req.query);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const getFilters =async (req,res,next)=>
{
    try
    {
        const result = await venuService.getFilters();
        return res.status(200).json(result);
    }
    catch(error)
    {
        console.error("getFilters Error:", error);
        next(error);
    }
}

const getVenueTypes = async(req,res,next)=>{
    try
    {
        const result = await venuService.getVenueTypes();
        return res.status(200).json(result);
    }
    catch(error)
    {
        console.error("getVenueTypes Error:", error);
        next(error);
    }
}

const getMyVenues = async(req,res,next)=>
{
    try
    {
        const result = await venuService.getMyVenues(req.user.userId,req.query);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const getById = async (req,res,next)=>{
    try
    {
        const result = await venuService.getById(req.params.id);

        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error)
    }
}


const getVenueForEdit = async (req,res,next)=>
{

    try
    {
        const result = await venuService.getVenueForEdit(req.params.id,req.user);

        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error)
    }
}

const getAllPendingApprovalVenues =async(req,res,next)=>{
    try
    {
        const { page, limit } = req.query;
        const result = await venuService.getAllPendingApprovalVenues(page, limit);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const approveVenue = async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const result = await venuService.approveVenue(id);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const rejectVenue = async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const result = await venuService.rejectVenue(id);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
    
}

const updateVenue = async (req,res,next)=>{
    try
    {
        const result = await venuService.updateVenue(
            req.params.id,
            req.user,
            req.body,
            req.files
        );
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const deleteVenue = async (req,res,next)=>{
    try
    {
        const result= await venuService.deleteVenue(
            req.params.id,
            req.user
        );
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
    
}

const activate = async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const result = await venuService.activate(id,req.user);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const deactivate = async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const result = await venuService.deactivate(id,req.user);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {
    create,
    getAll,
    getFilters,
    getVenueTypes,
    getMyVenues,
    getById,
    getVenueForEdit,
    getAllPendingApprovalVenues,
    approveVenue,
    rejectVenue,
    updateVenue,
    deleteVenue,
    activate,
    deactivate
}