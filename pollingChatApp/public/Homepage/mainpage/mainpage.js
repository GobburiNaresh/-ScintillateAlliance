const ctx = document.getElementById("voteChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "bar",
    data: {
    labels: ["Candidates"],
  },
  options: {

  }
});
const socket = io("localhost:3000");
  socket.on("update", (candidates) => {
  candidates = Object.entries(candidates);
  for (const [key, candidate] of candidates) {
    if(typeof chart.data.datasets[key] == "undefined" && chart.data.datasets.length < candidates.length ) {
      chart.data.datasets.push({
      backgroundColor: candidate.color,
      borderColor: candidate.color,
      data: [candidate.votes],
      label: candidate.label
      });
    } else  if(typeof chart.data.datasets[key] != "undefined") {
      chart.data.datasets[key].data = [candidate.votes];
    }
  }
  chart.update();
});

function vote(index) {
  socket.emit("vote", index);
}

////
socket.on("message", (data) => {
  const { message, timestamp } = data;
  const messageContainer = document.getElementById("messageContainer");
  const newMessage = document.createElement("div");
  newMessage.innerHTML = `${message} (${timestamp})`;
  messageContainer.appendChild(newMessage);
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

function sendMessage(message,timestamp) {
  socket.emit("sendMessage", { message: message, timestamp: timestamp });
}

function onSubmitHandler(event) {
  event.preventDefault();
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  const timestamp = new Date().toLocaleString();
  console.log(message);
  if (message !== "") {
      sendMessage(message,timestamp); 
      messageInput.value = "";
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', onSubmitHandler);
