import { useState, useEffect } from 'react';

import DetailView from '../view/DetailView'
import HTTPRequest from './function/HTTPRequest'

export default function Detail( { match } ) {
    // For detailpage bookdata rendering
    let [detailData, setDetailData] = useState()
    useEffect(() => {
      async function HTTPRequestForSetData() {
        let HTTPData = await HTTPRequest({
          start: 1,
          display: 100,
          d_isbn: match.params.isbn
        })
        setDetailData(HTTPData[0])
      }
      HTTPRequestForSetData()
    }, [])
  
    return <DetailView detailData={detailData} />
}