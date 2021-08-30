import { useEffect } from 'react';

import useDataApi from './custom/useDataApi'
import DetailView from '../View/DetailCardView'

export default function Detail( { match } ) {
    const [{data}, setParams] = useDataApi()
    
    useEffect(() => {
      setParams({
        start: 1,
        display: 1,
        d_titl: match.params.titl
      })
    }, [])


    return (
      <DetailView detailData={data.data}/>
      )
}