import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import './fonts/stylesheet.css';
import VideoPlayer from "./VideoPlayer";
import './App.css';
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

    if(now >= start && now <= end){
      canShow = true
    }

    if (!canShow && !config.IS_ADMIN) {
      return <div className="row">
        <div className="col-12">
          <b>Al momento non c'è nessun live,<br></br>ritorna in uno di questi orari:</b>
          <br></br><br></br>
          <b>Lunedì</b>: {schedule.LUN}<br></br>
          <b>Martedì</b>: {schedule.MAR}<br></br>
          <b>Mercoledì</b>: {schedule.MER}<br></br>
          <b>Giovedì</b>: {schedule.GIO}<br></br>
          <b>Venerdì</b>: {schedule.VEN}<br></br>
          <b>Sabato</b>: {schedule.SAB}<br></br>
          <b>Domenica</b>: {schedule.DOM}<br></br>
        </div>
      </div>
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
