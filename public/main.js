$(function() {
    const socket = io();

    /** USERNAME */
    var username;
    $(".form-username").submit(function(e) {
        e.preventDefault();
        const usernameInput = $("#username").val();
        if (usernameInput) {
            username = usernameInput;
            $('#username').attr("disabled", "disabled");
            $('#use').attr("disabled", "disabled");
        }
        return false;
    });

    /** MESSAGES */
    $(".form-message").submit(function(e) {
        e.preventDefault();
        const messageInput = $("#message").val();
        if (messageInput) {
            socket.emit("chat message", {
                username: username,
                message: $("#message").val()
            });
            $("#message").val("");
        }
        return false;
    });
    socket.on("chat message", function(data) {
        var $username = $("<span class=\"username\" />")
            .text(data.username);
        var $messageBody = $("<span />")
            .text(data.message);
        var $message = $("<li class=\"message\" />")
            .append($username, $messageBody);
        $("#messages").append($message);
    });
});