const mongoose = require('mongoose');

const Chart = mongoose.model('favoriteChartSchema')
module.exports = app =>{
    app.get('/savedChart',async (req,res)=>{
        const chart = await Chart.find({ _user: req.user.id });
        res.send(chart);
    })

    app.post('/savedChart',async(req,res)=>{
        const chart = await new Chart({
            _user: req.user.id,
            data:req.body
        }).save();
        res.send(chart);
        
    })

    app.delete('/savedChart',async(req,res)=>{
        await res.send(req.body);
        Chart.find({_id:req.body.id}).deleteOne().exec();
    })

    
}