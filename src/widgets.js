const { get_widget_by_name } = require('./helpers')
const db = require('./db')
const { render } = require('ejs')

exports.render_widget = async (widgets, i, page_param) => {
  if (i < widgets.length) {
    var widget = await get_widget_by_name(widgets[i].attrs.name)

    if (widget !== null) {
      try {
        if (widget.widget_type === 0) {
          var query_result = null

          if (widget.query !== null)
            query_result = await db.execute(widget.query, page_param)

          var html = render(widget.content, {
            widget,
            data: query_result
          })

          widgets[i].replaceWith(`
                            <!-- Start widget ${widget.name} -->
                            ${html}
                            <!-- End widget ${widget.name} -->
                        `)
        } else {
          await eval(widget.content)
          var result = await execute({ widget: widget, page_param: page_param })

          if (result.code === 200)
            widgets[i].replaceWith(`
                            <!-- Start widget ${widget.name} -->
                            ${result.data}
                            <!-- End widget ${widget.name} -->
                        `)
          else
            widgets[i].replaceWith(
              `<!-- Start widget ${widget.name}  -->
                        خطا در بارگذاری ویجت!
                        <!-- End widget ${widget.name} -->`
            )
        }
      } catch (error) {
        console.log(error)
        widgets[i].replaceWith(
          `<!-- Start widget ${widget.name}  -->
                        خطا در بارگذاری ویجت!
                    <!-- End widget ${widget.name} -->`
        )
      }
    } else {
      var message = `<!-- Start widget ${widgets[i].attrs.name}  -->
                ویجتی با این مشخصات یافت نشد!
            <!-- End widget ${widgets[i].attrs.name} -->`
      widgets[i].replaceWith(message)
    }
    i = i + 1
    await this.render_widget(widgets, i)
  }
}
