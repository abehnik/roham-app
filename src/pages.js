exports.render = async(req,res)=>{
    var page_lang = req.params.page_lang
    var page_url = req.params.page_url
    var page_param1 = req.params.page_param1
    var page_param2 = req.params.page_param2
    var page_param3 = req.params.page_param3
    res.send({
        page_lang,
        page_url,
        page_param1,
        page_param2,
        page_param3
    })
}