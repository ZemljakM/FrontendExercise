document.addEventListener('DOMContentLoaded', function() {
    getClubs();
    document.getElementById('createClub').addEventListener('submit', addClub);
    document.getElementById('updateClub').addEventListener('submit', updateClub);

});


function showForm(formId){
    const style = document.getElementById(formId).style.display;
    if(style == 'none'){
        document.getElementById(formId).style.display = 'block';
    }
    else {
        document.getElementById(formId).style.display = 'none';
    }
}

function addClub(event){
    event.preventDefault();
    let clubs = JSON.parse(localStorage.getItem('clubs')) || [];

    let club = {
        id: clubs.length + 1,
        name: document.getElementById("addName").value,
        sport: document.getElementById("addSport").value,
        dateOfEstablishemnt: document.getElementById("addDate").value,
        members: parseInt(document.getElementById("addMembers").value),
        president: document.getElementById("addPresident").value,
    };

    clubs.push(club);
    localStorage.setItem('clubs', JSON.stringify(clubs));
    document.getElementById('createClub').reset();
    showForm('createClubForm');
    getClubs();
}


function getClubs(){
    let clubs = [];
    const storageClubs = localStorage.getItem('clubs');
    if (storageClubs) {
        clubs = JSON.parse(storageClubs);
    } 


    const table = document.getElementById('clubsTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for(const club of clubs){
        let itemElement = document.createElement('tr');
        itemElement.classList.add('club');
        itemElement.innerHTML = `
            <td>${club.name}</td>
            <td>${club.sport}</td>
            <td>${club.dateOfEstablishemnt}</td>
            <td>${club.members}</td>
            <td>${club.president}</td>
            <td>
                <button class="updateClub" data-id="${club.id}">Update club</button>
                <button class="deleteClub" data-id="${club.id}">Delete club</button>
            </td>
        `;
        
        table.appendChild(itemElement);
        document.getElementById('updateClub').addEventListener('submit', updateClub);
        itemElement.querySelector('.updateClub').addEventListener("click", function(event) {
            event.preventDefault();
            showUpdateForm(parseInt(event.target.dataset.id));
        })

        itemElement.querySelector('.deleteClub').addEventListener("click", function(event) {
            event.preventDefault();
            deleteClub(parseInt(event.target.dataset.id));
        })
        
        
    }
}


function showUpdateForm(clubId){
    showForm('updateClubForm');
    document.getElementById('updateClub').dataset.clubId = clubId;
}

function updateClub(event) {
    event.preventDefault(); 

    let clubs = JSON.parse(localStorage.getItem('clubs')) || [];
    let clubId = parseInt(document.getElementById('updateClub').dataset.clubId);

    console.log(clubId);

    const name = document.getElementById('updateName').value; 
    const sport = document.getElementById('updateSport').value; 
    const date = document.getElementById('updateDate').value;
    const members = document.getElementById('updateMembers').value;
    const president = document.getElementById('updatePresident').value; 

    clubs.forEach(club => {
        if (club.id === clubId) {
            if(name){
                club.name = name; 
            }
            if(sport){
                club.sport = sport; 
            }
            if(date){
                club.dateOfEstablishemnt = date;
            }
            if(members){
                club.members = parseInt(members); 
            } 
            if(president){
                club.president = president;
            }
        }
    });

    localStorage.setItem('clubs', JSON.stringify(clubs)); 
    document.getElementById('updateClub').reset();
    showForm('updateClubForm');
    getClubs();
}


function deleteClub(clubId) {
    let clubs = JSON.parse(localStorage.getItem('clubs')) || [];

    const clubIndex = clubs.findIndex(club => club.id === clubId);
    if (clubIndex !== -1) {
        clubs.splice(clubIndex, 1); 
    }
    localStorage.setItem('clubs', JSON.stringify(clubs)); 
    getClubs();
}

