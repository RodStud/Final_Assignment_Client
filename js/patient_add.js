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
    document.getElementById("create_patient").addEventListener("click", create_patient);
    fill_selects();

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



function fill_selects() {
    fetch(`${server_url}/hobbies`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("p_hobbies");
            for (let i = 0; i < (data.length); i++) {
                container.innerHTML += `<option value="${data[i].id}">${data[i].hobby_name}</option>`;
            }
        });

    fetch(`${server_url}/hmo`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("p_hmo");
            for (let i = 0; i < (data.length); i++) {
                container.innerHTML += `<option value="${data[i].id}">${data[i].hmo_name}</option>`;
            }
        });

    fetch(`${server_url}/medical_condition`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("p_diagnosis");
            for (let i = 0; i < (data.length); i++) {
                container.innerHTML += `<option value="${data[i].id}">${data[i].diagnosis}</option>`;
            }
        });
};

function create_patient() {
    let patient = collect_profile_data();
    fetch(`${server_url}/patient_add`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
        .then(response => {
            if (response.status == 200) {
                window.location.href = `patient_list.html`;
            } else {
                document.getElementById("error").classList.remove("d-none");
                document.getElementById("error").classList.add("d-inline");
            }
        });
}

function collect_profile_data() {
    let hobby_array = Array.from(document.getElementById("p_hobbies").selectedOptions);
    let hobby = [];
    hobby_array.forEach(element => {
        hobby.push(element.value);
    });
    return patient = {
        child: {
            user_id: null,
            login: document.getElementById("p_id_number").value,
            password: document.getElementById("p_id_number").value,
            first_name: document.getElementById("p_firs_name").value,
            last_name: document.getElementById("p_last_name").value,
            telephone: document.getElementById("p_phone").value,
            email: document.getElementById("p_email").value,
            role_id: 2,
            birthday: document.getElementById("p_birth_date").value,
            hmo: document.getElementById("p_hmo").value,
            medical_condition: document.getElementById("p_diagnosis").value,
            hospital_duration: 0,
            description: document.getElementById("p_description").value,
            hobby: hobby
        },
        parent_1: {
            user_id: null,
            login: document.getElementById("p1_id_number").value,
            password: document.getElementById("p1_id_number").value,
            first_name: document.getElementById("p1_firs_name").value,
            last_name: document.getElementById("p1_last_name").value,
            telephone: document.getElementById("p1_phone").value,
            email: document.getElementById("p1_email").value,
            role_id: 3
        },
        parent_2: {
            user_id: null,
            login: document.getElementById("p2_id_number").value,
            password: document.getElementById("p2_id_number").value,
            first_name: document.getElementById("p2_firs_name").value,
            last_name: document.getElementById("p2_last_name").value,
            telephone: document.getElementById("p2_phone").value,
            email: document.getElementById("p2_email").value,
            role_id: 3
        }
    };
};

