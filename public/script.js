document.addEventListener("DOMContentLoaded", function() {
    const chatIcon = document.getElementById("chat-icon");
    const chatModal = document.getElementById("chat-modal");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");

    chatIcon.addEventListener("click", function() {
        chatModal.style.display = "block";
    });

    closeChat.addEventListener("click", function() {
        chatModal.style.display = "none";
    });

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        chatBody.innerHTML += `<div><strong>Bạn:</strong> ${message}</div>`;
        userInput.value = "";

        fetch("https://ai-hoaiducba-backend.onrender.com/chat", {
            method: "POST",
            mode: "cors",  // Bật chế độ CORS
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput.value })  // Đảm bảo JSON hợp lệ
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Lỗi từ server: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("📥 Phản hồi từ backend:", data);
            chatBody.innerHTML += `<div><strong>Trợ lý AI:</strong> ${data.reply}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        })
        .catch(error => {
            console.error("Lỗi khi gửi tin nhắn:", error);
            chatBody.innerHTML += `<div><strong>Trợ lý AI:</strong> Xin lỗi, tôi hiện đang trong quá trình học tập dữ liệu từ Ban chấp hành Hội, và sẽ cố gắng cung cấp câu trả lời tốt nhất cho bạn</div>`;
        });
    }
});
