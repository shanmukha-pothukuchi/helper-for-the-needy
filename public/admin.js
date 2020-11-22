const socket = io();

socket.on("broadcast", (data) => {
  console.log(data);
  const admin_board = document.querySelector(".messages");
  const div = document.createElement("div");
  div.classList.add("message");
  let h4 = document.createElement("h4");
  h4.innerHTML = "Message:";
  div.appendChild(h4);
  let p = document.createElement("p");
  p.classList.add("text");
  p.innerHTML = data.message;
  div.appendChild(p);
  let h42 = document.createElement("h4");
  h42.innerHTML = "Address";
  div.appendChild(h42);
  let p2 = document.createElement("p");
  p2.classList.add("text");
  p2.innerHTML = `${data.address.results[0].components.country}, ${data.address.results[0].components.continent}`;
  div.appendChild(p2);
  let btn1 = document.createElement("button");
  btn1.classList.add("approve");
  btn1.innerText = "Approve";
  div.appendChild(btn1);
  let btn2 = document.createElement("button");
  btn2.classList.add("decline");
  btn2.innerText = "Decline";
  div.appendChild(btn2);

  admin_board.appendChild(div);
});
