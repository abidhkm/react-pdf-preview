# react-pdf-previewer

> display pdf in canvas

[![NPM](https://img.shields.io/npm/v/react-pdf-preview.svg)](https://www.npmjs.com/package/react-pdf-preview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pdf-previewer
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-pdf-preview'

class Example extends Component {
  const pdf = '' //base64 format
  const [page,setPage] = React.useState(1)
  
  const onSuccessLoad = (data) => {
  //pdf details
  }

  render () {
    return (
      <MyComponent pdf={pdf} pageNum={page} onLoad={onSuccessLoad} />
    )
  }
}
```

## License

MIT © [abidhkm](https://github.com/abidhkm)
