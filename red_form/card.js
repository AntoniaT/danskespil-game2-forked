
document.querySelector('#btn_back').addEventListener('click', ()=>{
    console.log("hi")
    document.querySelector('.paycard').style.transform = 'rotateY(180deg)'
    setTimeout(() => {
        document.querySelector('.front').style.display = 'none';        
    }, 500);
})
document.querySelector('#btn_front').addEventListener('click', ()=>{
    console.log("hi")
    document.querySelector('.paycard').style.transform = 'rotateY(0deg)';
    setTimeout(() => {
        document.querySelector('.front').style.display = 'block';        
    }, 500);
})