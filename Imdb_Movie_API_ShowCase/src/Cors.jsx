import React from 'react'

export default function Cors() {
  
    function consoleFunction() {
        fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
    }

    return (
    <div>
      <button onClick={() => consoleFunction()}>CLick</button>
    </div>
  )
}
