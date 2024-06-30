import branch from './branch.png';
import branch2 from './image-removebg-preview (1).png';
import roses from './roses.png';
import java from './java.png';
import python from './python.png';
import logo from './logo.svg';
import sql from './Sql_data_base_with_logo-removebg-preview.png';
import node from './node-js-icon-454x512-nztofx17-removebg-preview.png';
import kotlin from './Kotlin_Icon-removebg-preview.png';
import cplusplus from './cpp_logo-removebg-preview.png';
import php from './PHP-logo.svg-removebg-preview.png';
import bouquet from './bouquet.png';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className='topSection'>
        <div className='name'>
          <img className="branch1" src={branch}/>
          <img className="branch2" src={branch2}/>
          <img className="branch3" src={branch2}/>
          <img className="branch4" src={branch}/>
          <img className="branch5" src={branch}/>

          <br></br> <br></br><br></br><br></br>
          <h1>Anika Thakur</h1>
          <h8 className='desc'>FULL STACK DEVELOPER</h8>
        </div>
      </div>
      <div className='frameSection'>
        <img className="ivy" src={roses}/>
        <h2 className='text1'>Frameworks</h2>
        <div className='row1'>
          <div className='java'>
            <img className="javaimg" src={java}/>
          </div>
          <div className='python'>
            <img className="pyimg" src={python}/>
          </div>
          <div className='react'>
            <img className="logoimg" src={logo}/>
          </div>
          <div className='node'>
            <img className="nodeimg" src={node}/>
          </div>
        </div>
        <div className='row2'>
          <div className='sql'>
            <img className="sqlimg" src={sql}/>
          </div>
          <div className='kotlin'>
            <img className="kotimg" src={kotlin}/>
          </div>
          <div className='cplusplus'>
            <img className="cimg" src={cplusplus}/>
          </div>
          <div className='php'>
            <img className="phpimg" src={php}/>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br><br></br>
      <div className='projs'>
        <h2 className='text2'>Highlighted Projects</h2>
        <br></br>
        <img className="bouqimg" src={bouquet}/>
        <table className='lockedin'>
          <tr>
            <th>LockedIn</th>
          </tr>
          <tr>
            <td style={{fontSize:"2.105vw"}}>A SearXNG powered search engine that eliminates distractions so you can lock in!</td>
          </tr>
        </table>
        <table className='swipeordare'>
          <tr>
            <th>Swipe or Dare</th>
          </tr>
          <tr>
            <td style={{fontSize:"1.8vw"}}>A multiplayer truth or dare game for Android phones powered by Firebase Realtime Database and Gemini API.</td>
          </tr>
        </table>
      </div>
      <div className='contactBar'>
        <h1>hiiiii</h1>
      </div>
    </div>
  );
}

export default App;
