const TransLog = require("../models/translationLogs");

exports.getTranslationLog = async(req, res, next)=>{
    try{
        const transLogs = await TransLog.find();
        res.status(200).json({
            numResults: transLogs.length,
            message:"success",
            transLogs
        })
    } catch(error){
        res.status(404).json({
            message:"error",
            error
        })
    }
}

exports.postTranslationLog = async(req, res, next)=>{
    try{
        const newLog = await TransLog.create(req.body)
        res.status(201).json({
            message:"success",
            log: newLog
        })
    } catch(error){
        res.status(400).json({
            message:"error",
            error
        })
    }
}

exports.deleteTranslationLog = async(req, res, next)=>{
    try{
        await TransLog.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"success",
            log: null
        })
    } catch(error){
        res.status(404).json({
            message:"error",
            error
        })
    }
}