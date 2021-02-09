import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';
import VideoPlayer from "./VideoPlayer";
import './App.css';
let config = require('./config.json')

const liveOptions = {
  autoplay: true,
  controls: true,
  liveui: true,
  sources: [{
    src: config.SOURCE_URL,
    type: 'application/x-mpegURL'
  }]
};

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img src="/logo.png" height="120"></img>
          <VideoPlayer { ...liveOptions } /><br />
          <h2>Programmazione</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
