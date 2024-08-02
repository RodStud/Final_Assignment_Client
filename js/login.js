const server_url = "https://final-assignment-server.onrender.com";

window.onload = () => {
    document.getElementById("button_send").addEventListener("click", authentication);
}

function authentication() {
    const login_data = {
        login: document.getElementById("login").value,
        password: document.getElementById("password").value
    };
    fetch(`${server_url}/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.user_id === 0) {
                document.getElementById("error").classList.remove("d-none");
                document.getElementById("error").classList.add("d-inline");
            } else {
                if (data.role == "Doctor") {
                    window.location.href = `patient_list.html`;
                } else {
                    window.location.href = `parent_home.html`;
                }
            }
        });

};