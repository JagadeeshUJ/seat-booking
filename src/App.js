
import './App.css';
import Seat from './components/Seat.js';
import { useState } from "react"
import { TbArmchair } from "react-icons/tb"



const  App=()=> {
  const [ticketType, setTicketType] = useState('Standard');
  const [ticketQuantity, setQuantityOfTicker] = useState('')

  const tickethandler = (event) => {
    setTicketType(event.target.value);
  }


  const quantityHandler = (event) => {
    setQuantityOfTicker(event.target.value)
  }

 
  return (
    <div className='main_container'>
      <div className='main_container_inner'>

        <div className='nav-container'>
          <div className="nav">
            <h2>DEVARA</h2>
            <p style={{fontSize:"13px"}}>Ranga Theater: Telugu | Today, 22 Oct, 02:30 PM</p>
          </div>
          <div className="ticketscount">
            <p className="ticket-number">{ticketQuantity}</p>
            <p className="ticket-label">{ticketQuantity==='' ? "tickets" : ticketQuantity<=1 ? "ticket" : "tickets"}</p>
            
          </div>
        </div>

        <div className="App">
          <div className='left'>
            <div className='dropdown'>

              <label htmlFor="tickettype" style={{fontSize:"13px"}} >Ticket Type:</label>
              <select id="tickettype" value={ticketType} onChange={tickethandler}>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>

              <label htmlFor="qty" style={{fontSize:"13px"}}> Quantity:</label>
              <select id="qty" value={ticketQuantity} onChange={quantityHandler}>
                <option value="">Quantity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>

              </select>
            </div>
            <Seat movieName="DEVARA" type={ticketType} ticketQuantity={ticketQuantity} />

          </div>
          <div className='right'>
            <div>
              <h3>Seat Layout:</h3>
              <ul>
              <li>
                  <TbArmchair className='premiumcolor size ' />
                  <p>Premium</p></li>
                  <li>
                  <TbArmchair className='yourselection size' />
                  <p>Your Selection</p></li>
                <li>
                  <TbArmchair className='available seat' style={{ width: "35px", height: "35px" }} />
                  <p>Available</p></li>

                <li>
                  <TbArmchair className='unavailable size' />
                  <p>Unavailable</p></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default App;
