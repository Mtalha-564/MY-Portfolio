let nav = document.querySelector(".navbar");
window.onscroll = function(){
if(document.documentElement.scrollTop > 50){
nav.classList.add("header-scrolled");
}
else {
nav.classList.remove("header-scrolled");
}
}
// nav link active for multiple page
const currentPage = window.location.pathname.split("/").pop(); // like about.html
const navLinks = document.querySelectorAll(".navbar .nav-link");

navLinks.forEach(link => {
const linkPage = link.getAttribute("href");
if (linkPage === currentPage || linkPage === "") {
link.classList.add("active");
} else {
link.classList.remove("active");
}
});
// button js to stay active for 1s
const btnContainers = document.querySelectorAll('.btn-container');

btnContainers.forEach((container) => {
container.addEventListener('click', () => {
container.classList.add('active');
setTimeout(() => {
container.classList.remove('active');
}, 1000); // 1 second
});
});
// about counter
gsap.registerPlugin(ScrollTrigger);

function createRollingDigits(counter, targetNum) {
counter.innerHTML = ''; // Clear existing

// Format number: pad to at least 2 digits (e.g. 3 → 03)
const formatted = targetNum.toString().padStart(2, '0');
const digits = formatted.split('');

digits.forEach(() => {
const digitContainer = document.createElement('div');
digitContainer.classList.add('rolling-digit');

const inner = document.createElement('div');

// Create 0–9 spans
for (let i = 0; i <= 9; i++) {
const span = document.createElement('span');
span.textContent = i;
inner.appendChild(span);
}

// Initially show 0
gsap.set(inner, { y: "0rem" });

digitContainer.appendChild(inner);
counter.appendChild(digitContainer);
});

// Add suffix (either % for skills or + for stats)
const suffix = document.createElement('span');
suffix.classList.add('rolling-plus'); // reuse class if styled
suffix.textContent = counter.classList.contains('skill-counter') ? "%" : "+";
counter.appendChild(suffix);
}

document.querySelectorAll('.rolling-counter').forEach(counter => {
const target = parseInt(counter.dataset.target, 10);
createRollingDigits(counter, target);

const digitWrappers = counter.querySelectorAll('.rolling-digit > div');

ScrollTrigger.create({
trigger: counter,
start: "top 85%",
once: true,
onEnter: () => {
const digits = target.toString().padStart(2, '0').split('');
digitWrappers.forEach((wrapper, i) => {
const digit = parseInt(digits[i], 10);
gsap.to(wrapper, {
y: `-${digit * 2}rem`, // digit height * position
duration: 1.4,
ease: "expo.out"
});
});
}
});
});
// country input 
const countries = [
"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
"Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
"Bosnia & Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
"Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
"Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
"El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
"Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
"Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
"Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
"Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
"Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
"Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
"New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
"Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
"Russia", "Rwanda", "Saint Kitts & Nevis", "Saint Lucia", "Saint Vincent & Grenadines", "Samoa", "San Marino",
"Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
"Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
"Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
"Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
"United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
"Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const countrySelect = $('#country');
countrySelect.append(`<option value="">Select Country</option>`);
countries.forEach(country => {
countrySelect.append(`<option value="${country}">${country}</option>`);
});

// Activate Select2 for the dropdown
countrySelect.select2({
placeholder: "Select Country",
width: '100%',
allowClear: true
});

// phone input
const phoneInput = document.querySelector("#phone");
const iti = intlTelInput(phoneInput, {
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
initialCountry: "auto",
geoIpLookup: cb =>
fetch("https://ipapi.co/json")
.then(res => res.json())
.then(data => cb(data.country_code || "pk"))
.catch(() => cb("pk"))
});

// budget input
const budgetSelect = document.getElementById("budget");
const customInput = document.getElementById("customBudget");

budgetSelect.addEventListener("change", function () {
if (this.value === "custom") {
customInput.classList.remove("d-none");
customInput.required = true;
} else {
customInput.classList.add("d-none");
customInput.required = false;
customInput.value = "";
}
});
// I'm INTERSTED IN Input
const interestSelect = document.getElementById("interest");
const customInterest = document.getElementById("customInterest");

interestSelect.addEventListener("change", function () {
if (this.value === "other") {
customInterest.classList.remove("d-none");
customInterest.required = true;
} else {
customInterest.classList.add("d-none");
customInterest.required = false;
customInterest.value = "";
}
});

function showConfirmationPopup() {
const popup = document.getElementById("confirmationPopup");
popup.classList.remove("d-none");

// ▶️ Play sound
const sound = document.getElementById("successSound");
if (sound) sound.play();

const duration = 3 * 1000;
const end = Date.now() + duration;

(function frame() {
confetti({
particleCount: 5,
angle: 60,
spread: 70,
origin: { x: 0 },
colors: ['#faad1a', '#344c36']
});
confetti({
particleCount: 5,
angle: 120,
spread: 70,
origin: { x: 1 },
colors: ['#faad1a', '#344c36']
});
if (Date.now() < end) {
requestAnimationFrame(frame);
}
})();

setTimeout(() => {
popup.classList.add("d-none");
}, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
e.preventDefault(); // Prevent normal form submit

// ✅ 1. Validate phone number using intl-tel-input
if (!iti.isValidNumber()) {
phoneInput.classList.add("is-invalid");

let phoneError = document.getElementById("phoneError");
if (!phoneError) {
phoneError = document.createElement("small");
phoneError.id = "phoneError";
phoneError.className = "text-danger mt-1 d-block";
phoneError.innerText = "Please enter a valid phone number.";
phoneInput.parentNode.appendChild(phoneError);
} else {
phoneError.classList.remove("d-none");
}

phoneInput.focus();
return;
} else {
phoneInput.classList.remove("is-invalid");
const phoneError = document.getElementById("phoneError");
if (phoneError) phoneError.classList.add("d-none");
}

// ✅ 2. Validate rest of the form
if (form.checkValidity()) {
const formData = new FormData(form);

// ✅ 3. Handle custom fields if visible
const customInterest = document.getElementById("customInterest");
const customBudget = document.getElementById("customBudget");

if (customInterest && !customInterest.classList.contains("d-none")) {
formData.set("interest", customInterest.value);
}

if (customBudget && !customBudget.classList.contains("d-none")) {
formData.set("budget", customBudget.value);
}

// ✅ 4. Submit via Web3Forms API
fetch("https://api.web3forms.com/submit", {
method: "POST",
body: formData,
headers: {
Accept: "application/json"
}
})
.then(res => res.json())
.then(data => {
if (data.success) {
showConfirmationPopup(); // 🎉 Confetti + popup

// ✅ Reset form after popup
setTimeout(() => {
form.reset();
$('#country').val('').trigger('change'); // Reset Select2
iti.setNumber(""); // Clear phone input
}, 1000);
} else {
alert("Something went wrong. Please try again.");
}
})
.catch(() => {
alert("Failed to submit form.");
});
} else {
form.reportValidity();
}
});
});
// slider skills
const skillSwiper = new Swiper('.skills-swiper', {
loop: true,
spaceBetween: 30,
autoplay: {
delay: 2100,
disableOnInteraction: false,
},
pagination: {
el: '.swiper-pagination',
clickable: true,
},
breakpoints: {
0: {
slidesPerView: 1,
},
353: {
slidesPerView: 2,
},
576: {
slidesPerView: 3,
},
768: {
slidesPerView: 3,
}
}
});

// Projects Modal
const modal = document.getElementById("projectModal");
const closeBtn = modal.querySelector(".close");
const modalImg = modal.querySelector(".modal-img");
const modalTitle = modal.querySelector(".modal-title");
const modalDesc = modal.querySelector(".modal-desc");
const modalList = modal.querySelector(".modal-list");

const openSound = document.getElementById("openSound");
const closeSound = document.getElementById("closeSound");

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
card.addEventListener("click", () => {
// Read data attributes
const title = card.dataset.title;
const desc = card.dataset.desc;
const img = card.dataset.img;
const bullets = JSON.parse(card.dataset.points || "[]");

// Set modal content
modalTitle.innerText = title || "Untitled Project";
modalDesc.innerText = desc || "";
modalImg.src = img || "images/thumbnail.png";

// Populate bullet list
modalList.innerHTML = "";
bullets.forEach(item => {
const li = document.createElement("li");
      
// Create icon span
const iconSpan = document.createElement("span");
iconSpan.className = "icon";
iconSpan.innerText = item.icon ?? "✔";
      
// Add icon + text to the list item
li.appendChild(iconSpan);
li.append(" " + item.text);
      
modalList.appendChild(li);
});
      

// Show modal
modal.style.display = "flex";
document.body.style.overflow = "hidden";
if (openSound) openSound.play();
});
});

// Close modal on close button
closeBtn.addEventListener("click", () => {
modal.style.display = "none";
document.body.style.overflow = "auto";
if (closeSound) closeSound.play();
});

// Close on outside click
window.addEventListener("click", (e) => {
if (e.target === modal) {
modal.style.display = "none";
document.body.style.overflow = "auto";
if (closeSound) closeSound.play();
}
});

// Close on ESC key
window.addEventListener("keydown", (e) => {
if (e.key === "Escape") {
modal.style.display = "none";
document.body.style.overflow = "auto";
if (closeSound) closeSound.play();
}
});
// Project C-T-A Section Tags Animation
const {
Engine, Render, Runner, Bodies, Composite,
Mouse, MouseConstraint, Events, Body
} = Matter;

const section = document.getElementById('physics-section');
const canvas = document.getElementById('matter-canvas');

const tags = [
'HTML5', 'CSS3', 'JavaScript', 'Responsive Design',
'Website Design', 'Cross-Browser Compatibility', 'UX/UI Design', 'Bootstrap',
'Landing Page', 'GSAP', 'Figma to Code', 'Animation & Transitions', 'Pixel-Perfect Design',
'Clean Code', 'Modern UI Design', 'Real-World Projects'
];
const colors = ['green', 'yellow'];

let engine, world, render, runner, tagBodies = [];

function init() {
if (render) {
Render.stop(render);
Runner.stop(runner);
render.canvas.remove();
render.textures = {};
}

engine = Engine.create();
world = engine.world;

const bounds = section.getBoundingClientRect();
canvas.width = bounds.width;
canvas.height = bounds.height;

render = Render.create({
canvas: canvas,
engine: engine,
options: {
width: bounds.width,
height: bounds.height,
wireframes: false,
background: 'transparent'
}
});

Render.run(render);
runner = Runner.create();
Runner.run(runner, engine);

const thickness = 100;
const walls = [
Bodies.rectangle(bounds.width / 2, -thickness / 2, bounds.width, thickness, { isStatic: true }),
Bodies.rectangle(bounds.width / 2, bounds.height + thickness / 2, bounds.width, thickness, { isStatic: true }),
Bodies.rectangle(-thickness / 2, bounds.height / 2, thickness, bounds.height, { isStatic: true }),
Bodies.rectangle(bounds.width + thickness / 2, bounds.height / 2, thickness, bounds.height, { isStatic: true })
];
Composite.add(world, walls);

document.querySelectorAll('.tag').forEach(el => el.remove());
tagBodies = [];

tags.forEach((text, i) => {
const tag = document.createElement('div');
tag.className = `tag ${colors[i % 2]}`;
tag.innerText = text;
section.appendChild(tag);

const width = tag.offsetWidth;
const height = tag.offsetHeight;

const body = Bodies.rectangle(
Math.random() * (bounds.width - width) + width / 2,
Math.random() * (bounds.height / 2),
width,
height,
{
restitution: 0.9,
friction: 0.2,
frictionAir: 0.02,
density: 0.002,
angle: Math.random() * Math.PI,
angularVelocity: 0.02
}
);

body.el = tag;
tagBodies.push({ body, tag, width, height });
Composite.add(world, body);
});

Events.on(engine, 'afterUpdate', () => {
tagBodies.forEach(({ body, tag }) => {
tag.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
tag.style.left = `${body.position.x}px`;
tag.style.top = `${body.position.y}px`;
});
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
mouse: mouse,
constraint: {
stiffness: 0.2,
render: { visible: false }
}
});
Composite.add(world, mouseConstraint);

setupScrollTrigger(bounds.width);
}

function setupScrollTrigger(containerWidth) {
const layout = [
[containerWidth * 0.3, 150],
[containerWidth * 0.5, 120],
[containerWidth * 0.7, 150],
[containerWidth * 0.4, 200],
[containerWidth * 0.6, 200],
[containerWidth * 0.2, 250],
[containerWidth * 0.5, 270],
[containerWidth * 0.8, 240],
[containerWidth * 0.3, 320],
[containerWidth * 0.6, 340],
[containerWidth * 0.45, 380],
[containerWidth * 0.7, 360],
];

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
layout.forEach((pos, i) => {
const { body } = tagBodies[i];
Body.setPosition(body, { x: pos[0], y: pos[1] });
Body.setVelocity(body, { x: 0, y: 0 });
Body.setAngularVelocity(body, 0);
});
}
});
}, { threshold: 0.3 });

observer.observe(section);
}

init();
window.addEventListener('resize', init);