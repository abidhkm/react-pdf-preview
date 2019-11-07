import React, { Component } from 'react'

import Document from 'react-pdf-preview'
import { pdfBase64 } from './pdfBase64'

export default class App extends Component {
  render () {

    const pdf = pdfBase64;    
    const onSuccessLoad = (data) => {
      console.log(data)
    }
    
    return (
      <div>
        <Document pdf={pdf} pageNum={1} onLoad={onSuccessLoad} />
      </div>
    )
  }
}
