import React from "react";
import Document from "react-pdf-preview";
import { pdfBase64 } from "./pdfBase64";

export default function App() {
  const pdf = pdfBase64;
  const [page, setPage] = React.useState(1);
  const [scale, setScale] = React.useState(1);
  const [numPages, setNumPages] = React.useState(null);

  const onSuccessLoad = data => {
    setNumPages(data._pdfInfo.numPages);
  };

  return (
    <div>
      <Document pdf={pdf} scale={scale} pageNum={page} onLoad={onSuccessLoad} />
      
      <button
        onClick={() => {
          page > 1 && setPage(page - 1);
        }}
      >
        prev
      </button>

      <button
        onClick={() => {
          page < numPages && setPage(page + 1);
        }}
      >
        next
      </button>

      <button
        onClick={() => {
          setScale(scale + 1);
        }}
      >
        scale +
      </button>

      <button
        onClick={() => {
          setScale(scale - 1);
        }}
      >
        scale -
      </button>
    </div>
  );
}
