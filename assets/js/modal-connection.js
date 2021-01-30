const $ = document;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded.");

    $.querySelector("#connection-button").addEventListener(
        "click",
        async () => {
            var modal = document.getElementById("modal-connection-background");

            //console.log(modal);
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            span.onclick = function () {
                modal.style.display = "none";
            };

            const contactForm = $.querySelector("#contactForm");

            contactForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const sendButton = $.querySelector("#sendButton");
                //console.log(sendButton);
                sendButton.setAttribute("disabled", "disabled");
                sendButton.classList.remove("send-button-enabled");
                sendButton.classList.add("send-button-disabled");
                const sendMessage = $.querySelector("#divSendMessage");
                const title = $.querySelector("#modal-connection-title");
                //console.log(title);

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
                    serverUrl = "https://lereacteur-tripadvisor.herokuapp.com";

                    await axios.post(serverUrl + "/contact", data);

                    sendButton.removeAttribute("disabled");
                    sendButton.classList.remove("send-button-disabled");
                    sendButton.classList.add("send-button-enabled");
                    contactForm.reset();
                    sendMessage.classList.remove("send-message-hidden");
                    // console.log(title.classList);
                } catch (error) {
                    alert("Erreur en envoi des données : " + error.message);
                    sendButton.removeAttribute("disabled");
                    sendButton.classList.remove("send-button-disabled");
                    sendButton.classList.add("send-button-enabled");
                }
            });

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
