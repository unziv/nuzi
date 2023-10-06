let log = null;
let ver = [];
let first = true;
fetch('jsons/log.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
            const savedStats = localStorage.getItem('LOG');
            if (savedStats) {
                //hello
            }
            else{
                location.reload(true);
            }
            localStorage.setItem('LOG', JSON.stringify(json));
      }
    )
    .catch(error => {
        location.reload(true);
        console.error('Error fetching log data:', error);
    });

const savedStats = localStorage.getItem('LOG');
if (savedStats) {
    log = JSON.parse(savedStats);
}

for (let i in log) {
    
    ver.push(i);
}

function UpdateItems(){
    for (let item of ver) {
        let i = null
        if (first){
            i = "Version " + item+" (Now) :";
            first = false
        }
        else{
            i = "Version " + item + " :";
        }
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = i;
        li.appendChild(strong);
            
        const ul = document.createElement('ul');
        for (let m of log[item]) {
          const liItem = document.createElement('li');
          liItem.className = 'ins';
          liItem.textContent = m;
          ul.appendChild(liItem);
        }
        
        li.appendChild(ul);
        const itemContainer = document.getElementById('head');
        itemContainer.appendChild(li);
    }
}
UpdateItems()