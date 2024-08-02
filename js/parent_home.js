const server_url = "https://final-assignment-server.onrender.com";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const patient_id = params.get('patient_id');

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

    fill_patient();

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

function fill_patient() {
    fetch(`${server_url}/parent`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            chart_insert(data.therapy_progress.total_progress);

            document.getElementById(`progress_attendance`).innerHTML = `${data.therapy_progress.percent_attendance}% | ${data.therapy_progress.attendance} of ${data.therapy_progress.total_attendance}`;
            document.getElementById(`progress_games`).innerHTML = `${data.therapy_progress.percent_games}% | ${data.therapy_progress.finished_games} of ${data.therapy_progress.total_games}`;
            document.getElementById(`progress_result`).innerHTML = `${data.therapy_progress.personal_result} | <span class="text-success">${data.therapy_progress.result_diff}%</span>`;
            document.getElementById(`progress_avg`).innerHTML = `${data.therapy_progress.average_result}`;

            for (let i = 0; i < data.therapy_list.length; i++) {
                document.getElementById(`therapy_list`).innerHTML += `<hr><a class="fw-bold text-black fs-5" href="#">${data.therapy_list[i].therapy_type}</a>`
            }

            document.getElementById('height').innerHTML = data.p_info.h + "m";
            document.getElementById('weight').innerHTML = data.p_info.weight + "kg";
            document.getElementById('blood').innerHTML = data.p_info.blood;

            document.getElementById('patient_name').innerHTML = data.user_info.first_name + " " + data.user_info.last_name;
            document.getElementById('game_name').innerHTML += data.games[0].title;

            for (let i = 0; i < data.games.length; i++) {
                document.getElementById('last_played_games').innerHTML += `
                <div class="col-sm-6 col-lg-2 text-center">
                                                <img width="70" height="100" src="images/games/${data.games[i].id}.png" alt="">
                                                <p class="text-center text-primary">Now</p>
                                                <p class="fw-bold">Personal Result:<br>${data.games[i].personal_result} <span class="text-danger">${data.games[i].diff}</span>
                                                </p>
                                            </div>
                `;
            }
            ;

            for (let i = 0; i < data.requests.length; i++) {
                document.getElementById('request_container').innerHTML += `
                <div class="col-4 p-0">
                                                <a href="#"
                                                   class="avatar-wrapper-patient">
                                                    <div class="avatar" style="">
                                                        <div class="avatar-aspect-ratio"></div>
                                                        <img alt="" draggable="true"
                                                             src="images/doctors/${data.requests[i].id}.jpg">
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="col-8 m-0 p-2 fw-bold">
                                                <div class="fs-5 mb-2">${data.requests[i].first_name} ${data.requests[i].last_name}<br><span class="fs-6 text-black-50">Physical Therapy</span></div>
                                                <p>${data.requests[i].title}</p>
                                                <p>${data.requests[i].content}</p>
                                            </div>
                                            <hr>
                `;
            }
            ;

        });
}

function chart_insert(finished) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Unfinished', 'Finished'],
            datasets: [{
                data: [100 - finished, finished],
                backgroundColor: [
                    '#FFFFFF',
                    '#fd7e14'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Total Therapy Progress: ${finished}%`,
                    position: 'bottom'
                },
                legend: {
                    display: false
                }
            }
        }
    });
}
