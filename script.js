const music = document.querySelector('audio')
const img = document.querySelector('img')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

let isPlaying = false

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Elecric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  { name: 'metric-1', displayName: 'Front Row (Remix)', artist: 'Metrix' },
]

function playSong() {
  music.play()
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
}

function pauseSong() {
  music.pause()
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  img.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

function nextSong() {
  songIndex === songs.length - 1 ? (songIndex = 0) : songIndex++
  loadSong(songs[songIndex])
  playSong()
}

function prevSong() {
  songIndex === 0 ? (songIndex = songs.length - 1) : songIndex--
  loadSong(songs[songIndex])
  playSong()
}

loadSong(songs[songIndex])

function updatPgorgessBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    const progressPersent = (currentTime / duration) * 100
    progress.style.width = progressPersent + '%'
    const durationMinute = Math.floor(duration / 60)
    let durationSecond = Math.floor(duration % 60)
    durationSecond < 10
      ? (durationSecond = `0${durationSecond}`)
      : durationSecond

    //Fixed Error NaN
    if (durationSecond) {
      durationEl.textContent = `${durationMinute}:${durationSecond}`
    }

    const currentMinute = Math.floor(currentTime / 60)
    let currentSecond = Math.floor(currentTime % 60)

    currentSecond < 10 ? (currentSecond = `0${currentSecond}`) : currentSecond

    currentTimeEl.textContent = `${currentMinute}:${currentSecond}`
  }
}

function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updatPgorgessBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
