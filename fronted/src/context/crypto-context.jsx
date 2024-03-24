import { createContext, useState, useEffect, useContext } from "react";
import {fakeFetchCrypto, fakeAssets} from '../api' 
import {percentDifference} from '../utils'


const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false
})

export const CryptoContextProvider = ({children}) => {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  function mapAssets(assets, crypto) {
    return assets.map((asset) => {
      const coin = crypto.find(c => c.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const {result} = await fakeFetchCrypto()
      const assets = await fakeAssets()
      
      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  function addAsset(asset) {
    setAssets(prev => mapAssets([...prev, asset], crypto))
  }
  
  return (
  <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
    {children}
  </CryptoContext.Provider>
  )
}; 

export default CryptoContext

export const useCripto = () => {
  return useContext(CryptoContext)
}