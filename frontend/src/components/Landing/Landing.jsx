import React from 'react'
import { useNavigate } from 'react-router-dom'


import rafiki from '../assets/images/WebsiteCreator.png'
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.png'
import ChatPana from '../assets/images/ChatPana.png'
import prevUI from '../assets/images/prevUI.png'
import CentreImg from '../assets/images/centerimage.png'
import removeBG from '../assets/images/removeBg.png'
import forMbgImage from '../assets/images/forMbgImage.png'
import twoDouble from '../assets/images/2667936.jpg'
import insta from '../assets/images/instagram.png'
import twitter from '../assets/images/twitter.png'
import facebook from '../assets/images/facebook.png'

import './Landing.css'



const Landing = () => {

    const navigate = useNavigate();

    
const handleLogin = ()  =>{
    navigate('/auth')
}




  return (
    <React.Fragment>
<>
  <div id="wrapper">
    <div id="nav-panel" className="container-fluid">
      <nav className="navbar navbar-expand-lg row">
        <div className="container-fluid col-10">
          <a className="navbar-brand" href="#">
            Chat <b>Box</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    {/* <hr> */}
    <div id="section1" className=" container-fluid p-0">
      <div className="row ">
        <div className="left-box col-sm-6 d-flex align-items-center justify-content-center min-vh-10 p-3">
          <div className="ms-2">
            {/* <span className="text-start">Chat Box</span> */}
            <br />
            <h1 className="">
              Online{" "}
              <span className="text-warning">
                <b>Chat platform</b>
              </span>
              <br />
              which provides <b>Real Time</b>
              <br />
              <b>Translation</b>
            </h1>
            <br />
            <p className="">
              A NLP model based chatting platform <br />
              where the chats are translated in real time.
            </p>
            
            <input
              type="button"
              defaultValue="Login"
              onClick={handleLogin}
              className="bg-warning p-2 w-50 mt-4  rounded mb-3"
            />
          </div>
        </div>
        <div className="right-box col-sm-6 d-flex align-items-center justify-content-center min-vh-10">
          <img
            src={rafiki}
            alt="right-box-image"
            width="60%"
          />
        </div>
      </div>
    </div>
    <hr />
    <div id="section2" className="container-fluid">
      <div className="row align-items-center justify-content-evenly h-100">
        <div className="col-sm-2 text-center">
          <img
            src={image1}
            alt="register-image"
            className="rounded-circle"
            width="50%"
          />
          <h3>Step1-&gt; Registration</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt,
            quo.
          </p>
        </div>
        <div className="col-sm-2 text-center">
          <img
            src={image2}
            alt="login-image"
            className="rounded-circle"
            width="50%"
          />
          <h3>Step2-&gt; Login</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nihil!
          </p>
        </div>
        <div className="col-sm-2 text-center">
          <img
            src={image3}
            alt="start-chatting-image"
            className="rounded-circle"
            width="50%"
          />
          <h3>Step3-&gt; Start Chatting</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            dolor.
          </p>
        </div>
      </div>
    </div>
    <hr />
    <div
      id="section3"
      className="container-fluid d-flex align-items-center p-0"
    >
      <div className="row w-100 p-0" id="section3-div">
        <div className="col-sm-5 d-flex align-items-center justify-content-end">
          <img src={ChatPana} alt="Chat-pana" width="79%" className="" />
        </div>
        <div className="col-sm-7 d-flex align-items-center justify-content-center p-4">
          <div>
            <h2>
              Chat<span className="text-warning"> Without</span> <br />
              Limits Out
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,{" "}
              <br /> aspernatur? Lorem ipsum dolor, sit amet consectetur <br />{" "}
              adipisicing elit. Laudantium, quam.
            </p>
            <div id="button">
              <input
                type="button"
                defaultValue="Google Play"
                className="p-2 rounded bg-black text-light"
              />
              <input
                type="button"
                defaultValue="App Store"
                className="p-2 rounded bg-black text-light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div id="section4">
      <div className="row mt-3">
        <div className="col d-flex align-items-center justify-content-center">
          <div>
            <h1 className="">
              Chat <span className="text-warning">Anyone</span> <br />{" "}
              <span className="text-warning">You Want</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="row justify-content-evenly align-items-center">
        <div className="col-md-3 text-center p-0">
          <img
            src={prevUI}
            alt="prevUI"
            height="400rem"
            className=""
          />
        </div>
        <div className="col-md-2 text-center p-0">
          <img src={CentreImg} alt="CentreImg" height="200rem" />
        </div>
        <div className="col-md-3 text-center p-0">
          <img src={removeBG} alt="" height="400rem" />
        </div>
      </div>
    </div>
    <hr />
    <div id="section5" style={{ height: "35rem" }}>
      <div className="row justify-content-evenly">
        <div className="col-md-4">
          <div className="d-flex justify-content-center position-relative">
            <div id="bgimage" className="position-absolute z-9 ms-5 mt-3">
              <img
                src={forMbgImage}
                alt=""
                width="500rem"
                height="550rem"
                className="shadow"
              />
            </div>
            <div
              className="shadow p-5 z-3 position-absolute bg-white"
              style={{ width: "30rem" }}
            >
              <div>
                <h2 className="text-center">Contact Us</h2>
                <div className="text-center mb-4">Chat Box</div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control border border-top-0 border-start-0 border-end-0"
                      id="userName"
                    />
                    <label htmlFor="Email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control border border-top-0 border-start-0 border-end-0"
                      id="Email"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control border border-top-0 border-start-0 border-end-0"
                      id="phoneNumber"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-warning">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <img src={twoDouble} alt="" width="500rem" />
        </div>
      </div>
    </div>
    <hr />
    <div id="footer">
      <div className="row align-items-center justify-content-evenly p-5">
        <div className="col-sm-4">
          <div>
            <h2>Chat Box</h2>
          </div>
          <div>
            <a
              className="ink-offset-2 link-underline link-underline-opacity-0"
              href="https:www.instagram.com"
            >
              <img src={insta} alt="" width="40px" />
            </a>
            <a
              className="ink-offset-2 link-underline link-underline-opacity-0"
              href="https:www.twitter.com"
            >
              <img src={twitter} alt="" width="40px" />
            </a>
            <a
              className="ink-offset-2 link-underline link-underline-opacity-0"
              href="https:www.facebook.com"
            >
              <img src={facebook} alt="" width="40px" />
            </a>
          </div>
        </div>
        <div className="col-sm-2">
          <h4>Chat</h4>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              Home
            </a>
          </p>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              About
            </a>
          </p>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              Contact
            </a>
          </p>
        </div>
        <div className="col-sm-2">
          <h4>Pricing</h4>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              Plans
            </a>
          </p>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              FAQ
            </a>
          </p>
        </div>
        <div className="col-sm-2">
          <h4>Resources</h4>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              Press
            </a>
          </p>
          <p>
            <a
              className="link-offset-2 link-underline link-underline-opacity-0"
              href="#"
            >
              Help Center
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</>

    </React.Fragment>
    
  )
}

export default Landing