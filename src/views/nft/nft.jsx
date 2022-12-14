import './nft.scss';
import 'swiper/swiper.min.css';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';
import SwiperCore, { Pagination } from 'swiper';

import TopImg from '../../assets/nft/1234.png';
import NFTIcon1 from '../../assets/nft/1@2x.png';
import NFTIcon2 from '../../assets/nft/2@2x.png';
import NFTIcon3 from '../../assets/nft/3@2x.png';
import NFTIcon4 from '../../assets/nft/4@2x.png';
import NFTIcon5 from '../../assets/nft/5@2x.png';
import NFTIcon6 from '../../assets/nft/6@2x.png';
import GiftImg from '../../assets/nft/liwu.png';

SwiperCore.use([Pagination])

export const NFTBySymbol = {
  'Cappa': NFTIcon1,
  'Etta': NFTIcon2,
  'Mocci': NFTIcon3,
  'Lamb': NFTIcon4,
  'Gamma': NFTIcon5,
  'Betta': NFTIcon6,
}

const TokenSymbol = ({ symbol, size = 50, msize = size, className }) => {
  if (!NFTBySymbol[symbol]) {
    return <span>{symbol}</span>
  }
  return (
    <ImgBox
      className={className}
      src={NFTBySymbol[symbol] || symbol}
      size={size}
      msize={msize}
    />
  )
};


const ImgBox = styled.img`
  width:200px;
  height:240px;
`

const NFTPage = () => {
  // const [num, setNum] = useState(1)
  const [scleft,setScLeft]=useState(0)
  const refdom=useRef()

  const NFTArr = useMemo(()=>{
    return [
      {
        name: 'Cappa',
        Level: '1',
        Hashrate: '1000',
        Rarity: '1',
        Probability: '60%'
      }, {
        name: 'Etta',
        Level: '2',
        Hashrate: '2000',
        Rarity: '2',
        Probability: '50%'
      }, {
        name: 'Mocci',
        Level: '3',
        Hashrate: '3000',
        Rarity: '3',
        Probability: '40%'
      }, {
        name: 'Lamb',
        Level: '4',
        Hashrate: '4000',
        Rarity: '4',
        Probability: '30%'
      }, {
        name: 'Gamma',
        Level: '5',
        Hashrate: '5000',
        Rarity: '5',
        Probability: '20%'
      }, {
        name: 'Betta',
        Level: '1',
        Hashrate: '1000',
        Rarity: '1',
        Probability: '60%'
      }
    ]
  },[window])
  const num = useMemo(()=>{
    const sl = 350
    return (scleft/sl +1).toFixed(0)
  },[scleft])
  const testFc=useCallback(()=>{
    const {scrollLeft} = refdom.current
    const wz = scleft - scrollLeft
    if(wz < -10 || wz > 10){
      setScLeft(scrollLeft)
    }
  },[])
  useEffect(()=>{
    refdom.current.addEventListener('scroll',testFc)
    // return ()=>refdom.current.remove('scroll',testFc)
  },[refdom.current?.offsetLeft])
  // console.error(NFTArr)
  return (
    <div>
      {/* ?????????????????? pc*/}
      <div className="maxTopBox">
        <div className="TopBox">
          <div className="titleBox">
            DynoNFT
          </div>
          <div className="textBox">
            DynoNFT is an important part of the DynoDAO ecosystem. Holders can obtain DynoNFT Collections by staking WAVE. In the near future, DynoNFT will be widely used in DynoDAO's protocol governance and community activities, becoming a status symbol of DynoNFT holders in the DynoDAO ecosystem.
          </div>
        </div>
        <div>
          <img src={TopImg} alt="" className="TopImgStyle" />
        </div>
        <div className="lingqu">
          <img src={GiftImg} alt="" className="Gift" />
          <span>Open a blind box</span>
        </div>
      </div>
      {/* ?????????????????? YD*/}
      <div className="maxTopBoxYD">
        <div>
          <img src={TopImg} alt="" className="TopImgStyle" />
        </div>
        <div className="TopBox">
          <div className="titleBox">
            DynoNFT
          </div>
          <div className="textBox">
            DynoNFT is an important part of the DynoDAO ecosystem. Holders can obtain DynoNFT Collections by staking WAVE. In the near future, DynoNFT will be widely used in DynoDAO's protocol governance and community activities, becoming a status symbol of DynoNFT holders in the DynoDAO ecosystem.
          </div>
        </div>
      </div>
      {/* ???????????? */}
      <div ref={refdom} className="bordBox">
        {/* ?????? */}
        {NFTArr.map((item, key) =><div key={key} className="cord">
            <TokenSymbol symbol={item.name} alt="" className="cordimg" />
            <div>
              <div className="Entry1"><span>{item.name}</span></div>
              <div className="Entry"><span>Level</span><span> {item.Level}</span></div>
              <div className="Entry"><span>Hashrate</span><span> {item.Hashrate}</span></div>
              <div className="Entry"><span>Rarity</span><span> {item.Rarity}</span></div>
              <div className="Entry"><span>Probability</span><span> {item.Probability}</span></div>
            </div>
          </div>)}


      </div>
      <div className="pagingStyle">
          {num}/6
      </div>
      <div className="lingqu2">
        <img src={GiftImg} alt="" className="Gift" />
        <span>Open a blind box</span>
      </div>
    </div>
  );
};

export default NFTPage;
