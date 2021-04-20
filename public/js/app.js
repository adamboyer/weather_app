

console.log('Client side javascript is loaded')






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading weather information...'
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageTwo.textContent = data.error
            } else {
                messageOne.innerHTML = "Today's Weather!<br>"
               messageTwo.innerHTML = `
               Forcast: ${data.forecast}<br>
               Location: ${data.location}<br>
               Address entered: ${data.address}
               `
            }
        })
    })
    
})