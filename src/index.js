import React, { useRef } from "react";

let pdfjsLib;

const Document = ({ pdf, onLoad, pageNum = 1, scale = 1 }) => {
  const [libLoaded, setLibLoaded] = React.useState(false);
  React.useEffect(() => {
    function addScript(attribute, text, callback) {
      const s = document.createElement("script");
      for (const attr in attribute) {
        s.setAttribute(attr, attribute[attr] ? attribute[attr] : null);
      }
      s.innerHTML = text;
      s.onload = callback;
      document.body.appendChild(s);
    }

    addScript(
      {
        src: "https://mozilla.github.io/pdf.js/build/pdf.js",
        type: "text/javascript",
        async: null
      },
      "<div>innerHTML</div>",
      function() {
        if (!pdfjsLib) {
          pdfjsLib = window["pdfjs-dist/build/pdf"];
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://gitcdn.xyz/repo/mozilla/pdf.js/gh-pages/build/pdf.worker.js";
        }
        setLibLoaded(true);
      }
    );
  }, []);

  const pdfV = React.useMemo(() => {
    return (
      <PdfViewer pdf={pdf} scale={scale} callback={onLoad} pageNum={pageNum} />
    );
  }, [pageNum, scale]);

  return (
    <div className="container">
      {libLoaded ? (
        pdfV
      ) : (
        <div className="loading">
          <p className="loading_indicator">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Document;

const PdfViewer = ({ pdf, pageNum, callback, scale }) => {
  // eslint-disable-next-line no-undef
  const pdfData = atob(pdf);
  const renderCanvas = useRef(null);

  const loadingTask = pdfjsLib.getDocument({ data: pdfData });
  loadingTask.promise.then(
    function(pdf) {
      callback(pdf);
      pdf.getPage(pageNum).then(function(_page) {
        const viewport = _page.getViewport({ scale });
        const canvas = renderCanvas.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport
        };
        const renderTask = _page.render(renderContext);
        renderTask.promise.then(function() {});
      });
    },
    function(reason) {
      console.error(reason);
    }
  );

  return <canvas ref={renderCanvas} className="pdf_canvas" />;
};
