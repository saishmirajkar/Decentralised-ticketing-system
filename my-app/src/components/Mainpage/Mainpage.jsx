import React from 'react';
import './Mainpage.css';
import { useEffect, useState } from 'react';
import axios from "axios"; 
import Popup from 'reactjs-popup';
import idGenerator from '../../contracts/idGenerator.json';
import Web3 from 'web3' ; 
import emailjs from 'emailjs-com'; 





const Mainpage = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [value2, setValue2] = useState("");
  const [index , setIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [idd,setId] = useState (null); 
  const [update, setUpdate] = useState(null); 
  
  const [state,setState] = useState ( {web3 : null, contract : null}); 

  

  useEffect ( ()=>  {
    const provider = new Web3.providers.HttpProvider ( "HTTP://127.0.0.1:7545")
    provider && template (); 

    async function template(){
    const web3 = new Web3(provider);
    const network_id = await web3.eth.net.getId ();  
    const deployedNetworks = idGenerator.networks[network_id]
    const contract = new web3.eth.Contract (idGenerator.abi, deployedNetworks.address); 
    console.log (contract); 
    setState ( { web3: web3, contract : contract } )
  }

  }, [])





  const handleInputChange = (e) => { 
 if (e.target.id === 'textInput1') {
      console.log("Input value:", e.target.value);
      setValue2(e.target.value);
    }
  }
  useEffect ( ()=> { 
  const pass = { id: idd, email: value2 };
  console.log('pass:', pass);

  // Send email using emailjs
  emailjs.send('service_hwcdgcf', 'template_8f3ctog', pass, 'dM03lGBPkH238-yzf')
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  },[idd]);
   
  useEffect ( ()=> { 
  console.log ('Variable 2:', value2);
    },[value2]);

    useEffect ( ()=> { 
      console.log ('Index:', selectedItemIndex);
        },[selectedItemIndex]);


  // using Async Await
  const getMyPostData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
    const images = [];
    for (var i = 0; i < 15; i++) {
      images.push("https://picsum.photos/200/300?random=" + i);
    }
    setImageSrc(images);
  }, []);

  const images = imageSrc.map((image, index) => ({ url: image, index }));

  const getInputValue = (index) => {
    setIndex(index); // Store the index in the state
    console.log('Index:', index);
    _setID(index) // Log the index to the console
  };

  async function _setID(number) {
    const { contract } = state;
    
   
    await contract.methods
      .setId(number)
      .send({ from: "0xAE78EAaEE800eE760D0B13f9d6a0dfF9cEe08646" });
      
      setUpdate (number) ;
    //window.location.reload();
   }

   useEffect ( ()=> {
    const {contract} = state; 
   

    async function result() {
      try {
        const data = await contract.methods.id().call();
       
        console.log(parseInt(data));
         setId(parseInt(data)); 
      } catch (error) {
        console.log("Error fetching result:", error);
        // Handle the error as needed
      }

    }
   

    contract && result (); 
  },[update]) 



   


  return (
    <div>
      <div className="background">
          <div className='cards'>
            <div className="grid">
              {images.map(({ url, index }) => {
                const post = myData[index];
                if (!post) return null;
                const { title, body } = post;
                return (
                  <div key={index} className="card">
                    <img className='imageedit' src={url} alt="Girl in a jacket" width="250" height="250" />
                    <h2 className='tile'>{title.slice(0, 15).toUpperCase()}</h2>
                    <p className='bodyu'>{body.slice(0, 100)}</p>
                   
                    <Popup trigger=
                { <button id="myButton" className='button-54'>BOOK NOW</button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <img className='imageedit' src={url} alt="Girl in a jacket" width="250" height="250" />
                              <p className='textEditor'>GREAT PICK.</p> <b></b> 
                              <p className='textEditor'> <b>{title.slice(0, 15).toUpperCase()} </b>IS ONE OF THE BEST EVENT WE GOT HERE</p>
                              <input id="textInput1" type = "text" className='gmailInput' placeholder='ENTER THE GMAIL' onChange={handleInputChange} required></input>
                            </div>
                            <div>
                            <Popup trigger=
                { <button onClick={({}) =>   getInputValue(index)} id="ConfirmButton" className='button-54'  >CONFIRM</button>
               }
                modal nested
                onOpen={() => getInputValue(index)}>
                {
                    close => (
                        <div id="modal2"className='modal'>
                            <div className='content'>
                               <p className='text2'> OOOLA LA! YOU EVENT TICKET IS CONFIRMED. </p> <b></b>
                                <p className='text2'>THE TICKET WILL BE MAILLED TO YOUR GMAIL.</p>
                            </div>
                            <div>
                                
                                <button id= "button2"className='button-54' onClick=
                                    {() => close()}>
                                        THANK YOU
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>             
          
                                <button id='closeButton' className='button-54' onClick=
                                    {() => close()} >
                                        Close 
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
                  </div>
                );
              })}
                  </div>
                </div>
     
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
    </div>
  );
};

export default Mainpage;


