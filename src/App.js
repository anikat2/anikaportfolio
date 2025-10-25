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
import github from './GitHub-Mark-ea2971cee799-removebg-preview.png';
import plants from './plants.png';
import linkedin from './LinkedIn_logo_initials-removebg-preview.png';
import insta from './insta.png';
import gmail from './gmaill.png';
import tiktok from './tiktok-logo-on-transparent-background-free-vector-removebg-preview.png';
import discord from './discord.png';
import AnimatedCursor from "react-animated-cursor"
import { useRef } from 'react';
import { useState, useEffect } from "react"
import exp from "./expflower.png"

import './App.css';

function App() {
  const carouselRef = useRef(null);
  const roles = [
    "FULL STACK DEVELOPER",
    "ANDROID DEVELOPER",
    "BAKER",
    "ROBOTICS ENGINEER",
  ]

  const [role, setCurrentRole] = useState(roles[0]);

  function setRandomName() {
    const index = Math.floor(Math.random() * roles.length);
    let newName = roles[index]
    if (newName == role) { setRandomName() }
    else { setCurrentRole(newName) }
    return
  }

  useEffect(() => {
    setTimeout(() => {
      setRandomName()
    }, 2000);
  }, [role])

  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: '3px solid var(--cursor-color)'
        }}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)'
        }}
      />
      <div className='topSection'>
        <div className='name'>
          <img className="branch1" src={branch}/>
          <img className="branch2" src={branch2}/>
          <img className="branch3" src={branch2}/>
          <img className="branch4" src={branch}/>
          <img className="branch5" src={branch}/>

          <br/><br/><br/><br/>
          <h1>Anika Thakur</h1>
          <h8 className='desc'>{role}</h8>
        </div>
      </div>
      <div className='frameSection'>
        <img className="ivy" src={roses}/>
        <h2 className='text1'>Frameworks</h2>
        <div className='row1'>
          <div className='java'>
            <img className="javaimg" src={java}/>
          </div>
          <div className='java1'>
            <p>{javaExp()} years</p>
          </div>
          <div className='python'>
            <img className="pyimg" src={python}/>
          </div>
          <div className='py1'>
            <p>{pyExp()} years</p>
          </div>
          <div className='react'>
            <img className="logoimg" src={logo}/>
          </div>
          <div className='re1'>
            <p>{reactExp()} years</p>
          </div>
          <div className='node'>
            <img className="nodeimg" src={node}/>
          </div>
          <div className='n1'>
            <p>{nodeExp()} years</p>
          </div>
        </div>
        <div className='row2'>
          <div className='sql'>
            <img className="sqlimg" src={sql}/>
          </div>
          <div className='s1'>
            <p>{pyExp()} years</p>
          </div>
          <div className='kotlin'>
            <img className="kotimg" src={kotlin}/>
          </div>
          <div className='k1'>
            <p>{reactExp()} years</p>
          </div>
          <div className='cplusplus'>
            <img className="cimg" src={cplusplus}/>
          </div>
          <div className='c1'>
            <p>{reactExp()} years</p>
          </div>
          <div className='php'>
            <img className="phpimg" src={php}/>
          </div>
          <div className='p1'>
            <p>{pyExp()} years</p>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/>
      <div className='projs'>
        <h2 className='text2'>Highlighted Projects</h2>
        <br/>
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
        <img className='plantsinarow' src={plants}/>
        <a href="https://github.com/anikat2" target="_blank" rel="noopener noreferrer">
          <img className='git' src={github} alt="GitHub"/>
        </a>

        <p className='gitp'>anikat2</p>
        <a href="https://www.linkedin.com/in/anika-thakur/" target="_blank" rel="noopener noreferrer">
          <img className='lin' src={linkedin} alt="LinkedIn"/>
        </a>
        <p className='linp'>anika thakur</p>
        <a href="https://www.instagram.com/anikapikalika/" target="_blank" rel="noopener noreferrer">
          <img className='insta' src={insta} alt="Instagram"/>
        </a>
        <p className='instap'>anikapikalika</p>
        <a href="mailto:anikathakur212@gmail.com" target="_blank" rel="noopener noreferrer">
          <img className='gmail' src={gmail} alt="Gmail"/>
        </a>
        <p className='gp'>anikathakur212</p>
        <a href="https://www.tiktok.com/@anikathak" target="_blank" rel="noopener noreferrer">
          <img className='tik' src={tiktok} alt="TikTok"/>
        </a>
        <p className='tikp'>anikathak</p>
        <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
          <img className='disc' src={discord} alt="Discord"/>
        </a>
        <p className='discp'>hwisnfocnv</p>
      </div>
<div className="experience">
        <img className="ivy2" src={exp}/>
        <h2 className="text4">Experience</h2>
        <div className="receipts-container">
          <div className="receipt">
            <div className="receipt-header">
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
              <h3 className="receipt-title">ANIKA'S RESUME RECEIPTS</h3>
              <div className="receipt-line"></div>
            </div>
            
            <div className="receipt-body">
              <div className="receipt-item">
                <span className="item-label">POSITION:</span>
                <span className="item-value">Software Engineering Intern</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">COMPANY:</span>
                <span className="item-value">Bloomberg LP</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">DURATION:</span>
                <span className="item-value">06/2025 - 08/2025</span>
              </div>
            </div>
            <div className="receipt-footer">
              <div className="receipt-line"></div>
              <p className="receipt-thanks">THANK YOU!</p>
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
            </div>
          </div>

          <div className="receipt">
            <div className="receipt-header">
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
              <h3 className="receipt-title">ANIKA'S RESUME RECEIPTS</h3>
              <div className="receipt-line"></div>
            </div>
            
            <div className="receipt-body">
              <div className="receipt-item">
                <span className="item-label">POSITION:</span>
                <span className="item-value">Quantitative Finance Programmer</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">ORGANIZATION:</span>
                <span className="item-value">Smith Investment Fund</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">DURATION:</span>
                <span className="item-value">10/2025 - Present</span>
              </div>
              <div className="receipt-line"></div>
            </div>
            
            <div className="receipt-footer">
              <p className="receipt-thanks">THANK YOU!</p>
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
            </div>
          </div>

          <div className="receipt">
            <div className="receipt-header">
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
              <h3 className="receipt-title">ANIKA'S RESUME RECEIPTS</h3>
              <div className="receipt-line"></div>
            </div>
            
            <div className="receipt-body">
              <div className="receipt-item">
                <span className="item-label">POSITION:</span>
                <span className="item-value">Technology Team Member</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">ORGANIZATION:</span>
                <span className="item-value">Bitcamp</span>
              </div>
              <div className="receipt-item">
                <span className="item-label">DURATION:</span>
                <span className="item-value">10/2025 - Present</span>
              </div>
              <div className="receipt-line"></div>
            </div>
            
            <div className="receipt-footer">
              <p className="receipt-thanks">THANK YOU!</p>
              <div className="receipt-dots">• • • • • • • • • • • • • • • •</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function javaExp(){
  return getYear() - 2020;
}
function pyExp(){
  return getYear() - 2021;
}
function reactExp(){
  return getYear() - 2023;
}
function nodeExp(){
  return getYear() - 2022;
}
function getYear() {
  return new Date().getFullYear();
}

export default App;
