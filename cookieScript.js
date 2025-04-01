console.warn("KAM CUMIS LOL");

// Počkej, až se načte DOM, pak teprve připoj event listenery
document.addEventListener("DOMContentLoaded", function () {
    let score = parseInt(getCookie("Bramburky")) || 0;
    let up = 0;
    let lastClickTime = 0;

    const scoreDisplay = document.getElementById("score");
    const clickableImage = document.getElementById("clickableImage");
    const lidlBtn = document.getElementById("lidl");
    const pennyBtn = document.getElementById("penny");

    scoreDisplay.textContent = score;

    clickableImage.addEventListener("click", (event) => {
        score += 1 + up;
        updateScoreDisplay();
        saveBramburky("Bramburky", score);

        const currentTime = Date.now();
        updateTextShadow(1000 / (currentTime - lastClickTime));
        lastClickTime = currentTime;

        addShakeEffect(clickableImage);
        addShakeEffect(scoreDisplay);
        addClickParticle(event);

        if (score >= 30) createGoal("Jupi matej uz nema hlad", "goal");
        if (score >= 100) createGoal("MATEJ SE PREJEDL", "goal1");
    });

    if (lidlBtn) lidlBtn.addEventListener("click", () => handleUpgrade("lidl", 10));
    if (pennyBtn) pennyBtn.addEventListener("click", () => handleUpgrade("penny", 25));

    function handleUpgrade(uName, cost) {
        if (score >= cost) {
            up += uName === "lidl" ? 1 : 5;
            score -= cost;
            saveBramburky("Bramburky", score);
            updateScoreDisplay();
            addUpgradeEffect(uName);
        }
    }

    function updateScoreDisplay() {
        scoreDisplay.textContent = score;
    }

    function updateTextShadow(speed) {
        const color = speed > 4 ? "red" : speed > 2 ? "orange" : "green";
        document.getElementById("body").style.textShadow = `2px 2px 4px ${color}`;
    }

    function addShakeEffect(element) {
        element.classList.add("shake");
        setTimeout(() => element.classList.remove("shake"), 500);
    }

    function addClickParticle(event) {
        const particles = ["+1 bramburky", "+1 uzena klobaska", "+1 cokolada", "+1 tocena zmrzlina"];
        const randomParticle = particles[Math.floor(Math.random() * particles.length)];

        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.textContent = randomParticle;

        const x = event.clientX + Math.random() * 30 - 15;
        const y = event.clientY - 20;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }

    function createGoal(text, className) {
        const goal = document.createElement("div");
        goal.classList.add(className, "goal-animation");
        goal.textContent = text;

        document.body.appendChild(goal);
        setTimeout(() => goal.remove(), 2000);
    }

    function addUpgradeEffect(upgradeName) {
        const effect = document.createElement("div");
        effect.classList.add("upgrade-effect");
        effect.textContent = `+${upgradeName === "lidl" ? 1 : 5} bonus!`;

        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1500);
    }

    function saveBramburky(cname, cvalue) {
        document.cookie = `${cname}=${cvalue};path=/;max-age=${365 * 24 * 60 * 60}`;
    }

    function getCookie(cname) {
        const name = `${cname}=`;
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c = c.trim();
            if (c.startsWith(name)) return c.substring(name.length);
        }
        return "0";
    }
});
