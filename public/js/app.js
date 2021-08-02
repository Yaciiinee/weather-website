const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    p1.textContent = "Loading.."
    p2.textContent = "";
    const ville = search.value
    fetch("http://localhost:3000/weather?adress=" + ville).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error;
                p2.textContent = "";
            } else {
                p1.textContent = data.location;
                p2.textContent = data.forecast + "," + " حاليا درجة الحرارة: " + data.temp
            }
        })
    })

})