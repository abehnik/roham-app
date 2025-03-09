exports.render = async(req,res)=>{
    var api_url = req.params.api_url
    res.send({
      api_url
    })
}