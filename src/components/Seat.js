import "./Seat.css"
import { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import {TbArmchair} from "react-icons/tb"

const Seat=(props)=> {
    let seatnumber = props.ticketQuantity

    
    const seating=[
        [0, 0, 0, 0, 0, 1, 2, 0, 3, 4, 0, 5, 6, 0, 7, 8, 0, 9, 10, 0, 11, 12, 0, 13, 14],
        [0, 0, 0, 0, 0, 15, 16, 0, 17, 18, 0, 19, 20, 0, 21, 22, 0, 23, 24, 0, 25, 26, 0, 27, 28],
        [0, 0, 0, 0, 0, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 0, 0, 0, 39, 40, 41, 42, 43, 44, 45],
        [0, 0, 0, 0, 0, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 0, 0, 0, 56, 57, 58, 59, 60, 61, 62],
        [0, 0, 0, 0, 0, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 0, 0, 0, 73, 74, 75, 76, 77, 78, 79],
        [0, 0, 0, 0, 0, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 0, 0, 0, 90, 91, 92, 93, 94, 95, 96],
        [0, 0, 0, 0, 0, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 0, 0, 0, 107, 108, 109, 110, 111, 112, 113],
        [115, 116, 117, 0, 0, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 0, 0, 0, 128, 129, 130, 132, 132, 133, 134],
        [135, 136, 137, 0, 0, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 0, 0, 0, 148, 149, 150, 151, 152, 153, 154],
        [0, 0, 0, 0, 0, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 0, 0, 0, 165, 166, 167, 168, 169, 170, 171],
        [0, 0, 0, 0, 0, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 0, 0, 0, 182, 183, 184, 185, 186, 187, 188],
        [0, 0, 0, 0, 0, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 0, 0, 0, 199, 200, 201, 202, 203, 204, 205],

    ]

    const [seats, setSeats] = useState(seating.map((item,index) => item.map((data) => (
        { id: data, isZero: data, isSelected: false, isBooked: false, type: index>1? "Standard" :"Premium" }))));

    const [selectedSeats, setSelectedSeats] = useState(seats.flat().filter(item => item.isSelected).length)
    
    
    const resetSelection=(arr)=> {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j].isSelected = false;
            }
        }
        return arr;
    }
    


    const bookHandler = (seatId,seat) => {
        console.log(seat)
        
        let unSelectPrev = resetSelection(seats);

    if (seatnumber === '') {
        alert("Please select ticket quantity");
        return;
    }

    if (seat.type !== props.type) {
        alert("Please select a tickets of type " + props.type);
        return;
    }
        
        const updatedSeats = unSelectPrev.map((row) => {
            return row.map((seat) => {
                if (seat.id === seatId && !seat.isBooked) {
                    const seatIndex = row.indexOf(seat);
                
                    let selectedCount = 0;
                    row.forEach((s) => {
                        if (s.isSelected) {
                            selectedCount++;
                        }
                    });
    
                    if (selectedCount < seatnumber) {
                        for (let i = seatIndex; i < row.length; i++) {
                            if (row[i].id !==0 && !row[i].isBooked  && !row[i].isSelected) {
                                row[i].isSelected = true;
                                selectedCount++;
                            }
                            if (selectedCount >= seatnumber) {
                                break;
                            }
                        }
                    }
                }
                return seat;
            });
        });
    
        setSeats(updatedSeats);
        setSelectedSeats(selectedSeats + 1);
    };
    
    const hasSelected = seats.some(row => row.some(item => item.isSelected));
    const proceedHandler = () => {
        if(!hasSelected){
            alert("Please select seat");
            return
        }
        if (seatnumber === ''){
            alert("Please select ticket quantity");
            return
        }
        
        
        setSeats(seats.map(item => item.map(data => {
            if (data.isSelected) {
                return { ...data, isBooked: true, isSelected: false }
            } else {
                return data
            }

        })))
        alert(`Congratulations, you have booked the ${props.type} tickets of DEVARA..!`)
        setSelectedSeats(0)
    }
    return (<div className="container">
        
            {seats.map((row, index1) => {
                return (
                    <div key={index1} style={{ display: "flex" ,width:"100%"}}>
                        <div style={{ width: "40px",marginTop:"15px" }}>
                            {String.fromCharCode(81 - index1)}
                        </div>
                        {row.map((seat, index2) => (
                            <><p key={index2}></p>
                                {seat.isZero !== 0 ? (
                                    <TbArmchair onClick={() => bookHandler(seat.id,seat)}
                                    className={`${seat.isBooked ? 'booked' : seat.isSelected ? 'selected'
                                     : seat.type === 'Premium' ? 'premiumcolor hover' : 'available hover seat'}`}
                                    style={{ width: "3.5%",height:"40px",color:"black" }}
                                    />
                                ) : (
                                    <span style={{ marginRight: "3.5%"}}></span>
                                )}
                            </>
                        ))}
                    </div>
                );
            })}

            
                <p style={{paddingTop:"40px",color:"red"}}>Screen</p>
            


        
        <button className="btn" onClick={proceedHandler}>PROCEED</button>
        
    </div>)
}
 
export default Seat;
