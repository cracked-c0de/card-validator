import { useState } from "react"
import { useRef } from "react"


function App() {
  let card = useRef()
  let numbers = []
  let [notification, updNotification] = useState()
  const [inputValue, setInputValue] = useState("")

  //functions
  let check = () => {
    let cleanValue = card.current.value.replace(/\s/g, ""); // Remove spaces
  
    if (cleanValue.length === 16) {
      updNotification();
      numbers = [];
  
      for (let i = 0; i < cleanValue.length; i++) {
        if ((i + 1) % 2 !== 0) { // Extract numbers at 1st, 3rd, 5th... (1-based odd positions)
          numbers.push(cleanValue[i]);
        }
      }
  
      console.log(numbers);
      validate();
    } else if (card.current.value.length < 16) {
      updNotification(<p className="text-red-600">Card length should be 16 numbers!</p>);
    }
  };
  

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value; // Add space every 4 digits
    setInputValue(formattedValue);
  }

  function validate() {
    let evens = []
    for (let i = 0; i < numbers.length; i++) {
      let number = Number(numbers[i])
      number = number * 2
      if (String(number.length) < 1) {
        first = String(number[0])
        second = String(number[1])
        number = Number(first) + Number(second)
        evens.push(number)
      } else {
        evens.push(number)
      }
    }
    console.log(evens)
    numbers = evens
    secondStage()
  }

  function secondStage() {
    let number = 0
    for (let i = 0; i < numbers.length; i++) {
      let otherNumber = numbers[i]
      number = number + otherNumber
    }
    let validity = number % 10
    if (validity == 0) {
      updNotification(<p>This Card is Valid!</p>)
    } else {
      updNotification(<p>Fake Card!</p>)
    }
    console.log(number)
  }
  return(
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-center m-2 text-2xl font-semibold">Card Validity Checker</h1>
        <div className="flex items-center flex-col border-1 p-5 rounded-xl bg-white">
          <label htmlFor="card" className="m-1 text-xl">Enter Card Number:</label>
          <input className="border-1 rounded-xl m-2 px-3 py-1 text-lg text-center bg-white" placeholder="1234 5678 9123 4567" type="text" value={inputValue} name="card" id="card" ref={card} maxLength={19} onChange={handleInputChange} />
          <button className="border-1 px-3 cursor-pointer rounded-xl text-xl py-1 hover:text-white hover:bg-black transition-all delay-75" onClick={() => check()}>Check</button>
          {notification}
        </div>
        <p className="text-green-700 font-mono bg-black px-2 m-2">Developer: &lt;/cracked-c0de&gt;</p>
      </div>
    </>
  )
}

export default App