import React from 'react'
import PropTypes from 'prop-types'
var pdfjsLib

const Document = ({pdf, onLoad, pageNum = 1}) => {
  const [libLoaded, setLibLoaded] = React.useState(false)
  React.useEffect(() => {
    function addScript(attribute, text, callback) {
      var s = document.createElement('script')
      for (var attr in attribute) {
        s.setAttribute(attr, attribute[attr] ? attribute[attr] : null)
      }
      s.innerHTML = text
      s.onload = callback
      document.body.appendChild(s)
    }

    addScript({
      src: 'https://mozilla.github.io/pdf.js/build/pdf.js',
      type: 'text/javascript',
      async: null
    }, '<div>innerHTML</div>', function() {
      if (!pdfjsLib) {
        pdfjsLib = window['pdfjs-dist/build/pdf']
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://gitcdn.xyz/repo/mozilla/pdf.js/gh-pages/build/pdf.worker.js'
      }
      setLibLoaded(true)
    })
  }, [])

  return (
    <div className='container'>
      { libLoaded ? <PdfViewer pdf={pdf} callback={onLoad} pageNum={pageNum} /> : <div className='loading'><p className='loading_indicator'>Loading...</p></div>}
    </div>
  )
}

Document.propTypes = {
  pdf: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  pageNum: PropTypes.number
}

export default Document

const PdfViewer = ({pdf, pageNum, callback}) => {
  // eslint-disable-next-line no-undef
  const pdfData = atob(pdf)

  const loadingTask = pdfjsLib.getDocument({ data: pdfData })
  loadingTask.promise.then(function (pdf) {
    callback(pdf)
    pdf.getPage(pageNum).then(function (_page) {
      const scale = 1
      const viewport = _page.getViewport({ scale: scale })

      const canvas = document.getElementById('the-canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      const renderTask = _page.render(renderContext)
      renderTask.promise.then(function () {
      })
    })
  }, function (reason) {
    console.error(reason)
  })

  return (
    <canvas id='the-canvas' className='pdf_canvas' />
  )
}

PdfViewer.propTypes = {
  pdf: PropTypes.string.isRequired,
  callback: PropTypes.func,
  pageNum: PropTypes.number
}
