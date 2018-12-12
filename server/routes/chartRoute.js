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
            ...req.body
        }).save();
        res.send(chart);
    })
    
}