const server_url = "https://final-assignment-server.onrender.com";

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

    fill_schedule();

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

function fill_schedule() {
    fetch(`${server_url}/parent_appointment`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.schedule.length; i++) {
                document.getElementById('schedule_list').innerHTML += `<div class="text-black-50 fs-5">Game Therapy Session ${data.schedule[i].session_number}</div><div class="fs-6">${data.schedule[i].date} | ${data.schedule[i].start_time} - ${data.schedule[i].end_time}</div><hr>`;
            }
            for (let i = 0; i < data.history.length; i++) {
                document.getElementById('appointments_history').innerHTML += `<div class="text-black-50 fs-5">Game Therapy Session ${data.history[i].session_number}</div><div class="fs-6">${data.history[i].date} | ${data.history[i].start_time} - ${data.history[i].end_time}</div><hr>`;
            }
        });
}
