const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = Number(document.getElementById('guess').value);
    attempts++;

    if (guess === secretNumber) {
        document.getElementById('result').textContent = `Selamat!! Anda Menebak Angka ${secretNumber} Dengan Benar Dalam ${attempts} Percobaan.`;
    } else if (guess < secretNumber) {
        document.getElementById('result').textContent = 'Tebakan Andah Terlalu Rendah. Coba Lagi.';
    } else if (guess > secretNumber) {
        document.getElementById('result').textContent = 'Tebakan Anda Terlalu Tinggi. Coba Lagi.';
    }
}