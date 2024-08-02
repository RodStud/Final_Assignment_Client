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

    get_patient_list();

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

function get_patient_list() {
    fetch(`${server_url}/patient_list`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("card_container");
            let card = document.getElementById("card_element");
            for (let i = 0; i < (data.length); i++) {
                container.innerHTML += create_new_card(data[i]);
            }
        });
};

function create_new_card(data) {
    let card = `
    <div class="col">
        <div class="card shadow mt-4">
            <div class="card-body fs-6">
                <div class="row">
                    <div class="col-4 p-0">
                        <a class="avatar-wrapper-patient" href="patient.html?patient_id=${data.id}">
                        <div class="avatar" style="">
                            <div class="avatar-aspect-ratio"></div>
                            <img alt="" draggable="true" src="images/patients/${data.id}.jpg">
                        </div>
                        </a>
                    </div>
                    <div class="col-8 m-0 p-2 fw-bold text-end">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        <p class="card-text">Age: ${data.age}</p>
                    </div>
                    <hr>
                    <p class="card-text">
                        ID: ${data.login}<br>
                        Medical Condition: ${data.medical_condition}<br>
                        Hospitalization Duration: ${data.hospital_duration}<br>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
    return card;
}
