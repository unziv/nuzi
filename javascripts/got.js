let log = null;
let ver = [];
let first = true;
let varsion = document.getElementById("ver");
fetch('jsons/log.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
            const sav = localStorage.getItem('LOG2');
            if (sav) {
                //hello
            }
            else{
                location.reload(true);
            }
            localStorage.setItem('LOG2', JSON.stringify(json));
      }
    )
    .catch(error => {
        location.reload(true);
        console.error('Error fetching log data:', error);
    });

const sav = localStorage.getItem('LOG2');
if (sav) {
    log = JSON.parse(sav);
}

for (let i in log) {
    
    ver.push(i);
}

function UpdateItems(){
    for (let item of ver) {
        let i = null
        if (first){
            varsion.innerText = "Version " + item;
            first = false
        }
    }
}
UpdateItems()