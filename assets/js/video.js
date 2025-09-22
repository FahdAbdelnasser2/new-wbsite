       const video = document.getElementById("myVideo");
        const playBtn = document.getElementById("play-button");
        const seekBar = document.getElementById("seekBar");
        playBtn.addEventListener("click", () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        video.addEventListener("timeupdate", () => {
            seekBar.value = (video.currentTime / video.duration) * 100;
        });
        video.addEventListener("timeupdate", () => {
            const value = (video.currentTime / video.duration) * 100;
            seekBar.value = value;
            seekBar.style.background = `linear-gradient(to left, #17aabd ${value}%, #ddd ${value}%)`;
        });
        seekBar.addEventListener("input", () => {
            const time = (seekBar.value / 100) * video.duration;
            video.currentTime = time;
            seekBar.style.background = `linear-gradient(to left, #17aabd ${seekBar.value}%, #ddd ${seekBar.value}%)`;
        });
        video.addEventListener("play", () => {
            playBtn.style.display = "none";
        });
        video.addEventListener("click", () => {
            if (!video.paused) {
                video.pause();
                playBtn.style.display = "flex";
            }
        });
        video.addEventListener("ended", () => {
            playBtn.style.display = "flex";
        });