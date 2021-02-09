import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, ButtonGroup } from 'react-bootstrap';
import './fonts/stylesheet.css';
import VideoPlayer from "./VideoPlayer";
import './App.css';
import play from '../src/assets/play.svg'
import appstore from '../src/assets/appstore.svg'
import globe from '../src/assets/globe.svg'
import rvst from '../src/assets/rvst.svg'
import scrypta from '../src/assets/foundation.svg'
import chain from '../src/assets/chainblock.svg'
import cafe from '../src/assets/cafe.png'
import news from '../src/assets/news.svg'
import cataudo from '../src/assets/cataudo.jpeg'
import pecoraro from '../src/assets/pecoraro.jpeg'
import bossio from '../src/assets/BOSSIO.jpeg'
import laurenti from '../src/assets/laurenti.jpg'

let config = require('./config.json')
const axios = require('axios')

const liveOptions = {
  autoplay: true,
  controls: true,
  liveui: true,
  sources: [{
    src: config.SOURCE_URL,
    type: 'application/x-mpegURL'
  }]
};

const days = {
  0: "DOM",
  1: "LUN",
  2: "MAR",
  3: "MER",
  4: "GIO",
  5: "VEN",
  6: "SAB"
}

function Header() {
  return <div className="row">
    <div className="col-12">
      <img src="/logo.png" alt="CryptoRivista" height="120"></img>
    </div>
  </div>
}

function Body() {

  let [isLoading, setLoading] = useState(true)
  let [isGetting, setGetting] = useState(false)
  let [schedule, setSchedule] = useState({})

  if (isLoading && !isGetting) {
    setGetting(true)
    axios.get('https://raw.githubusercontent.com/turinglabsorg/cryptorivista-club/master/liveset/scheduled.json').then(res => {
      setSchedule(res.data)
      setLoading(false)
    })
  }

  if (isLoading) {
    return <div>Caricamento...</div>
  } else {
    let canShow = false

    let today = new Date().getDay()
    let scheduled = schedule[days[today]]
    let split = scheduled.split('-')
    let fullday = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    let start = new Date(fullday + ' ' + split[0] + ':00').getTime()
    let end = new Date(fullday + ' ' + split[1] + ':00').getTime()
    let now = new Date().getTime()

    if (now >= start && now <= end) {
      canShow = true
    }

    if (scheduled === "-" || !canShow || config.IS_ADMIN) {
      return (
        <div className="row">
          <div className="col-4 divider2">
            <div className="d-flex align-items-center">
              <img alt="onair" style={{ width: "30%", marginRight: "10px" }} src={play}></img>
              <h1 style={{ fontWeight: "600", fontSize: "70px" }}>ON AIR</h1>
            </div>
            <div className="text-left" style={{ marginTop: "50px", float: "left" }}>
              <div className="d-flex align-items-center">
                <img alt="appstore" style={{ height: "30px", marginRight: "10px" }} src={appstore} />
                <a href="https://apps.apple.com/it/app/clubhouse-drop-in-audio-chat/id1503133294"><h2 style={{ color: "black" }}>CLUBHOUSE APP</h2></a>
              </div>
              <div className="d-flex align-items-center mt-2 mb-5">
                <img alt="link" style={{ height: "30px", marginRight: "10px" }} src={globe} />
                <a href="https://cryptorivista.club/"> <h2 style={{ color: "black" }}>CRYPTORIVISTA.CLUB</h2></a>
              </div>
              <div className="divider mb-5">
                <div style={{ paddingLeft: "10px" }}>
                  <h3 className="no_bottom">Brand</h3>
                  <h1 className="no_bottom" style={{ fontWeight: 600 }}>PARTNER</h1>
                  <h3 className="no_bottom">2021</h3>
                </div>
              </div>
              <div>
                <img alt="Crypto Rivista" className="mb-4" style={{ height: "20px" }} src={rvst} /><br></br>
                <img alt="Scrypta Foundation" className="mb-4" style={{ height: "40px" }} src={scrypta} /><br></br>
                <img alt="Chainblock" style={{ height: "40px" }} src={chain} />
              </div>
            </div>
          </div>
          <div className="col-8 text-left" style={{ textAlign: 'left', padding: "11px 6px" }}>
            <div className="row align-items-center divider3">
              <div className="col-3">
                <img style={{ height: "150px" }} src={cafe} />
              </div>
              <div className="col-5">
                <h1 style={{ fontWeight: 600 }}>Bitcoin Caffé</h1>
              </div>
              <div className="col-4">
                <h4>Dal lunedì al venerdì <br></br> ore 14:15 - 16:00</h4>
              </div>
            </div>
            <div className="row align-items-center mt-5 divider3">
              <div className="col-3">
                <img style={{ height: "150px" }} src={news} />
              </div>
              <div className="col-5">
                <h1 style={{ fontWeight: 600 }}>BTC Saturday <br></br>News</h1>
              </div>
              <div className="col-4">
                <h4>sabato<br></br> ore 11:00 - 13:00</h4>
              </div>
            </div>
            <div className="mt-1 ml-1">
              <h1>MODERATORI</h1>
            </div>
            <div className="row align-items-center mt-5 ml-2">
              <div className="col-2">
                <img style={{ height: "100px",  borderRadius: "50%" }} src={laurenti} />
              </div>
              <div className="col-2">
                <img style={{ height: "100px",  borderRadius: "50%" }} src={cataudo} />
              </div>
              <div className="col-2">
                <img style={{ height: "100px",  borderRadius: "50%" }} src={bossio} />
              </div>
              <div className="col-2">
                <img style={{ height: "100px", borderRadius: "50%" }} src={pecoraro} />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div className="row">
        <div className="col-12">
          <VideoPlayer {...liveOptions} />
        </div>
      </div>
    }
  }
}
function Footer() {
  return <p style={{ marginTop: '20px', fontSize: '16px' }}>developed with ❤️ by <a rel="noreferrer" href="https://turinglabs.org" target="_blank">turinglabs</a></p>
}

function App() {

  return (
    <div className="container">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
