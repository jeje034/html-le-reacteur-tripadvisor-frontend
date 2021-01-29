const $ = document;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded.");

    $.querySelector("#connection-button").addEventListener(
        "click",
        async () => {
            var modal = document.getElementById("modal-connection-background");
            console.log(modal);
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            span.onclick = function () {
                modal.style.display = "none";
            };

            $.querySelector("#contactForm").addEventListener(
                "submit",
                async (event) => {
                    event.preventDefault();

                    try {
                        const data = {
                            firstname: $.querySelector("#firstname").value,
                            lastname: $.querySelector("#lastname").value,
                            email: $.querySelector("#email").value,
                            subject: $.querySelector("#subject").value,
                            message: $.querySelector("#message").value,
                        };

                        //console.log(data);

                        let serverUrl = "http://localhost:3000";
                        serverUrl =
                            "https://lereacteur-tripadvisor.herokuapp.com";

                        await axios.post(serverUrl + "/contact", data);

                        alert("Données envoyées.");
                    } catch (error) {
                        alert("Erreur en envoi des données : " + error.message);
                    }
                }
            );

            // When the user clicks on <span> (x), close the modal
            // On ne fait pas ça sur ancienne version de TripAdvisor
            // (https://clever-heisenberg-b48f64.netlify.app/)
            //=> je ne le fait pas non plus
            // window.onclick = function (event) {
            //     if (event.target == modal) {
            //         modal.style.display = "none";
            //     }
            // };
        }
    );
});
