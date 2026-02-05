const scene = document.getElementById("scene");
const prompt = document.getElementById("prompt");
const reaction = document.getElementById("reaction");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noWrap = document.getElementById("noWrap");
const fireworks = document.getElementById("fireworks");

const reactions = [
  { className: "react-sad", text: "Koala status: tiny heartbreak detected." },
  { className: "react-faint", text: "Koala status: dramatic fainting spell." },
  { className: "react-hide", text: "Koala status: hiding behind the tree." },
  { className: "react-sleep", text: "Koala status: power-napping to cope." },
  { className: "react-dramatic", text: "Koala status: clutching chest, monologuing." },
];

let reactionIndex = 0;
let zapCount = 0;
const zapLimit = 2 + Math.floor(Math.random() * 2);

const setScene = (className, text) => {
  scene.className = `scene ${className}`;
  reaction.textContent = text;
};

const zapNoButton = () => {
  zapCount += 1;
  noBtn.classList.add("is-zapping");
  const wrapRect = noWrap.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(20, (wrapRect.width - btnRect.width) / 2 - 8);
  const maxY = Math.max(14, (wrapRect.height - btnRect.height) / 2 - 8);
  const nextX = Math.floor((Math.random() * 2 - 1) * maxX);
  const nextY = Math.floor((Math.random() * 2 - 1) * maxY);

  noBtn.style.setProperty("--tx", `${nextX}px`);
  noBtn.style.setProperty("--ty", `${nextY}px`);
  prompt.textContent = zapCount < zapLimit
    ? "The No button is feeling shy. Try again."
    : "Okay, okay, you can click it now.";
};

noBtn.addEventListener("pointerdown", (event) => {
  const shouldZap = zapCount < zapLimit || Math.random() < 0.75;
  if (shouldZap) {
    event.preventDefault();
    event.stopPropagation();
    zapNoButton();
  }
});

noBtn.addEventListener("click", () => {
  if (zapCount < zapLimit) {
    return;
  }
  if (Math.random() < 0.75) {
    zapNoButton();
    return;
  }
  const current = reactions[reactionIndex % reactions.length];
  setScene(current.className, current.text);
  reactionIndex += 1;
  prompt.textContent = "Do you want to reconsider? The squirrel is cheering for a yes.";
});

yesBtn.addEventListener("click", () => {
  setScene("react-yes", "Koala status: moving in for the coziest hug.");
  prompt.textContent = "Savor this moment... the tree is about to get crowded.";
  fireworks.classList.add("show");
  setTimeout(() => {
    scene.classList.add("climb");
    reaction.textContent = "Koala status: climbing the tree with the squirrel.";
    prompt.textContent = "Hearts are floating... they are heading up.";
  }, 1200);
  setTimeout(() => {
    scene.classList.add("vanish");
    reaction.textContent = "Koala status: disappeared into the treetop.";
    prompt.textContent = "They vanished into the leaves. Valentine confirmed.";
  }, 2600);
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.textContent = "Locked In";
});

window.addEventListener("resize", () => {
  noBtn.style.setProperty("--tx", "0px");
  noBtn.style.setProperty("--ty", "0px");
});
