
const answer = document.querySelector('h3');
const button = document.querySelector('button');

button.addEventListener("click", async ()=>{
    const filename = document.getElementById('filename').value;
    const prompt = document.getElementById('prompt').value;


    const data = await fetch('/query', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            csv: filename,
            prompt: prompt
        })
    })
    
    answer.textContent = await data.text();
})
