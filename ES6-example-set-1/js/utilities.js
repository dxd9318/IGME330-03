export function addTextToBody(text) {
    const div = document.createElement('div');
    div.textContent = text;
    document.body.appendChild(div);
}

function myPrivateFunction() {
    console.log("privateFunction() is not visible outside of utilities.js!");
}



// OR

// function addTextToBody(text) {
//     const div = document.createElement('div');
//     div.textContent = text;
//     document.body.appendChild(div);
//   }
  
//   function myPrivateFunction(){
//       console.log("privateFunction() is not visible outside of utilities.js!");
//   }
  
//   export {addTextToBody};