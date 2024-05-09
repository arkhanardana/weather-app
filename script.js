const apiKey = "974a54fef2b8865d58528fd1319f7711";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?=&units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");
const cityInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Fungsi async untuk memeriksa cuaca berdasarkan kota yang diberikan.
async function checkWeather(city) {
  // Mengirimkan permintaan ke API cuaca OpenWeatherMap menggunakan kota yang diberikan.
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Memeriksa status respons dari permintaan.
  if (response.status == 404) {
    // Jika kota tidak ditemukan, tampilkan pesan kesalahan.
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Jika kota ditemukan, mendapatkan data cuaca dari respons JSON.
    let data = await response.json();

    // Memperbarui tampilan dengan informasi cuaca yang diperoleh.
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    // Memilih ikon cuaca berdasarkan kondisi cuaca utama.
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Menampilkan tampilan cuaca dan menyembunyikan pesan kesalahan.
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Menambahkan event listener untuk tombol pencarian cuaca.
searchBtn.addEventListener("click", () => {
  checkWeather(cityInput.value);
});
