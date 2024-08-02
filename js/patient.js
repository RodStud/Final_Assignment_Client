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
    fetch(`${server_url}/patient?patient_id=${patient_id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('patient_image').src = `images/patients/${patient_id}.jpg`;

            document.getElementById(`patient_info`).innerHTML = `<label class="col-6">ID:</label>\n` +
                `<div class="col-6 text-start text-secondary">${data.patient.patient.login}</div>\n` +
                `<label class="col-6">Age:</label>\n` +
                `<div class="col-6 text-start text-secondary">${data.patient.patient.age}</div>\n` +
                `<label class="col-6">First Name:</label>\n` +
                `<div class="col-6 text-start text-secondary">${data.patient.patient.first_name}</div>\n` +
                `<label class="col-6">Last Name:</label>\n` +
                `<div class="col-6 text-start text-secondary">${data.patient.patient.last_name}</div>\n`;

            if (data.patient.parent_1 != null) {
                insert_parent(data.patient.parent_1);
            }

            if (data.patient.parent_2 != null) {
                insert_parent(data.patient.parent_2);
            }

            for (let i = 0; i < data.therapy_list.length; i++) {
                document.getElementById(`therapy_list`).innerHTML += `<hr><a class="fw-bold text-black fs-5" href="therapy.html?therapy_id=${data.therapy_list[i].therapy_id}">${data.therapy_list[i].therapy_type}</a>`
            }

            document.getElementById(`progress_attendance`).innerHTML = `${data.patient.therapy_progress.percent_attendance}% | ${data.patient.therapy_progress.attendance} of ${data.patient.therapy_progress.total_attendance}`;
            document.getElementById(`progress_games`).innerHTML = `${data.patient.therapy_progress.percent_games}% | ${data.patient.therapy_progress.finished_games} of ${data.patient.therapy_progress.total_games}`;
            document.getElementById(`progress_result`).innerHTML = `${data.patient.therapy_progress.personal_result} | <span class="text-success">${data.patient.therapy_progress.result_diff}%</span>`;
            document.getElementById(`progress_avg`).innerHTML = `${data.patient.therapy_progress.average_result}`;

            chart_insert(data.patient.therapy_progress.total_progress);

            for (let i = 0; i < data.patient.schedule.length; i++) {
                document.getElementById(`schedule_list`).innerHTML += `<div class="text-black-50">Game Therapy Session ${data.patient.schedule[i].session_number}</div><div>${data.patient.schedule[i].date} | ${data.patient.schedule[i].start_time} - ${data.patient.schedule[i].end_time}</div><hr>`;
            }

            for (let i = 0; i < data.patient.requests.length; i++) {
                document.getElementById(`request_list`).innerHTML += `<table class="table">
                                        <tr><td colspan="3">${data.patient.requests[i].title}</td></tr>
                                        <tr>
                                            <td style="width: 70px">
                                                <img width="70" height="100" src="images/games/${data.patient.requests[i].game_id}.png" alt="">
                                            </td>
                                            <td class="fw-bold fs-5">${data.patient.requests[i].content}</td>
                                            <td>
                                                <img src="images/ok.png" alt=""><br>
                                                <img src="images/close.png" alt="">
                                            </td>
                                        </tr>
                                    </table>
                                    <hr>`;
            }
        });
}

function insert_parent(data) {
    document.getElementById("parent_info").innerHTML +=
        `                                    <div class="col-6">
                                        <div class="fs-4">${data.first_name} ${data.last_name}</div>
                                        <div class="fs-6 icon-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 class="bi bi-envelope" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                            </svg>
                                            ${data.email}
                                        </div>
                                        <br>
                                        <div class="fs-6 icon-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 class="bi bi-telephone" viewBox="0 0 16 16">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                            </svg>
                                            ${data.telephone}
                                        </div>
                                    </div>`
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
