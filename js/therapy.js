const server_url = "https://final-assignment-server.onrender.com";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const therapy_id = params.get('therapy_id');

window.onload = () => {
    fetch(`${server_url}/test_auth`, {
        method: "GET",
        credentials: 'include',
    })
        .then(response => {
                if (response.status === 401)
                    document.location.href = "login.html";
            }
        );

    get_therapy()

    document.getElementById("logout-btn").addEventListener("click", logout);
    document.getElementById("logout_btn").addEventListener("click", logout);
}

function logout() {
    fetch(`${server_url}/logout`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.href = "login.html";
}

function get_therapy() {
    fetch(`${server_url}/therapy?therapy_id=${therapy_id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById(`height`).innerHTML = `${data.physical_info.h} m`;
            document.getElementById(`weight`).innerHTML = `${data.physical_info.weight} kg`;
            document.getElementById(`blood`).innerHTML = data.physical_info.blood;

            document.getElementById(`heart-rate`).innerHTML = `${data.physical_info.heart_rate} bpm`;
            document.getElementById(`temperature`).innerHTML = `${data.physical_info.t} &#8451;`;
            document.getElementById(`pressure-sys`).innerHTML = `${data.physical_info.sys} mmHG`;
            document.getElementById(`pressure-dia`).innerHTML = `${data.physical_info.dia} mmHG`;

            document.getElementById('video').src = data.physical_info.gameplay;

            for (let i = 0; i < data.games_progress.length; i++) {
                document.getElementById('games_list').innerHTML += `         
                    <div class="col-sm-12 col-xxl-3">
                        <div class="row m-2">
                            <div class="col-sm-3 col-xxl-6 ps-0 bg-body">
                                <img alt="" width="150" height="256" src="images/games/${data.games_progress[i].id}.png">
                            </div>
                            <div class="col-sm-9 col-xxl-6 fw-bold bg-body">
                                <div class="">Game Progress:</div>
                                <div class="mb-3 text-black-50">${data.games_progress[i].total_progress}%</div>
                                <div class="">Achievement Progress:</div>
                                <div class="mb-3 text-black-50">${data.games_progress[i].total_achievements}%</div>
                                <div class="">Personal Result:</div>
                                <div class=" text-black-50">${data.games_progress[i].total_result}</div>
                            </div>
                        </div>
                    </div>`;
            }

            for (let i = 0; i < data.games_progress.length; i++) {
                document.getElementById('games-list').innerHTML += `
                    <div class="row">
                        <div class="col-3 p-0">
                            <img alt="" width="70" height="100" src="images/games/${data.games_progress[i].id}.png">
                        </div>
                        <div class="col-9 m-0 p-0 fw-bold">
                            <div class="mb-3">Game Progress: <span class="text-success">${data.games_progress[i].game_progress}%</span></div>
                            <div class="mb-3">Achievement Progress: <span class="text-success">${data.games_progress[i].achievement_progress}%</span></div>
                            <div class="mb-3">Personal Result: <span class="text-success">${data.games_progress[i].personal_result}</span></div>
                        </div>
                    </div>
        `;
            }
        });


}
