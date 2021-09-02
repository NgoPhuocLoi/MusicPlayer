const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const currentSongInfo = $('.current-song-info')
const CD = $('.CD')
const repeatBtn = $('.repeat-btn')
const preBtn = $('.pre-btn')
const playControl = $('.play-and-pause')
const playBtn = $('.play-btn')
const pauseBtn = $('.pause-btn')
const nextBtn = $('.next-btn')
const randomBtn = $('.random-btn')
const currentSongName = currentSongInfo.querySelector('.music-name')
const currentSongImg = currentSongInfo.querySelector('.CD .CD-img')
const audio = currentSongInfo.querySelector('audio')
const progressBar = $('.progress')
const playlist = $('.playlist')


const app = {
    currentIndex : 0,
    isRandom: false,
    isRepeat: false,

    defineProperties(){
        Object.defineProperty(this, 'currentSong', {
            get(){
                return this.songs[this.currentIndex]
            }
        })
    },


    songs: [
        {
            name: 'Sài Gòn đau lòng quá',
            singer:'Hoàng Mỹ',
            path:'./playlist/song9.mp3',
            image:'./images/baby.jpeg'
        },
        {
            name: 'Matabaki',
            singer:'Hoàng Mỹ',
            path:'./playlist/song10.mp3',
            image:'./images/baby.jpeg'
        },
        {
            name: 'Lemon Tree',
            singer:'Fools Garden',
            path:'./playlist/song1.mp3',
            image:'./images/song1.jpg'
        },
        {
            name: 'Ái nộ',
            singer:'Masew x Khoi Vu',
            path:'./playlist/song2.mp3',
            image:'./images/song2.jfif'
        },
        {
            name: 'Nhất thân',
            singer:'Masew x Khoi Vu',
            path:'./playlist/song3.mp3',
            image:'./images/song3.jfif'
        },
        {
            name: 'Monsters',
            singer:'Katie Sky',
            path:'./playlist/song4.mp3',
            image:'./images/song4.jfif'
        },
        {
            name: 'I love you 3000',
            singer:'Stephanie Poetri',
            path:'./playlist/song5.mp3',
            image:'./images/song5.png'
        },
        {
            name: 'Matabaki',
            singer:'Osamu ft. Harutya',
            path:'./playlist/song6.mp3',
            image:'./images/song6.jpg'
        },
        {
            name: 'Love is Gone',
            singer:'SLANDER ft. Dylan Matthew',
            path:'./playlist/song7.mp3',
            image:'./images/song7.jfif'
        },
        {
            name: 'Koko De Ikiteru',
            singer:'Tantei Wa Mou, Shindeiru. Opening',
            path:'./playlist/song8.mp3',
            image:'./images/song8.jpg'
        },
        {
            name: 'Girls like you',
            singer:'Maroon 5',
            path:'./playlist/song11.mp3',
            image:'./images/song11.jfif'
        },
        {
            name: 'Perfect Two',
            singer:'Auburn',
            path:'./playlist/song12.mp3',
            image:'./images/song12.jfif'
        },
        {
            name: 'Death Bed',
            singer:'Powfu, Beabadoobee',
            path:'./playlist/song13.mp3',
            image:'./images/song13.jfif'
        },
        
    ],

    renderSong(){
        const htmls = this.songs.map((song, index) => {
            return `<div class="song song-${index} ${index === app.currentIndex ? 'active' : ''} " data-index = "${index}">
                
            <img src="${song.image}" alt="" class="song__thumb">
            
            <div class="song-info">
                <div class="song__name">${song.name}</div>
                <div class="song__singer">${song.singer}</div>
            </div>
        </div>`
        })

        playlist.innerHTML = htmls.join('')
    },
    
    loadCurrentSong() {       
        currentSongName.textContent = `${this.currentSong.name}`
        currentSongImg.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = `${this.currentSong.path}`
        
    },

    playSong(){
        playControl.classList.add('playing')
        audio.play()
    },

    pauseSong(){
        playControl.classList.remove('playing')
        audio.pause()
    }, 

    nextSong(){
        app.currentIndex++
        if(app.currentIndex >= app.songs.length){
            app.currentIndex = 0
        }
        this.activeNewSong()
        app.loadCurrentSong()
        this.scrollActiveSongIntoView()
    },

    previousSong(){
        app.currentIndex--
        if(app.currentIndex < 0){
            app.currentIndex = app.songs.length - 1
        }
        this.activeNewSong()
        app.loadCurrentSong()
        this.scrollActiveSongIntoView()
    },

    randomSong(){
        let randomIndex
        do{
            randomIndex = Math.floor(Math.random() * this.songs.length)
        }while(randomIndex === this.currentIndex)

        this.currentIndex = randomIndex
        this.loadCurrentSong()
        this.activeNewSong()
        this.scrollActiveSongIntoView()

    },

    repeatSong(){
        this.playSong()
    },
    
    activeNewSong(){
        $('.song.active').classList.remove('active')
        $(`.song-${this.currentIndex}`).classList.add('active')
    },

    activeSongWhenClick(e){
        const song = e.target.closest('.song')
        const songIndex = song.getAttribute('data-index')
        app.currentIndex = Number(songIndex)
        this.loadCurrentSong()
        this.activeNewSong()
    },

    scrollActiveSongIntoView(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        },100)
    },

    handleEvents(){
        const originCDWidth = CD.offsetWidth
        const CdImgAnimate = currentSongImg.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iterations: Infinity
        })

        CdImgAnimate.pause()

        window.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const currentCDWidth = originCDWidth - scrollTop
            if(currentCDWidth <= 0){
                CD.style.width = `0px`
            }else{
                CD.style.opacity = `${currentCDWidth / originCDWidth}`
                CD.style.width = `${currentCDWidth}px`
            }
        }

        playBtn.onclick = function(){
            app.playSong()
            CdImgAnimate.play()
        }

        pauseBtn.onclick = function(){
            app.pauseSong()
            CdImgAnimate.pause()
        }

        nextBtn.onclick = function() {
            if(app.isRandom){
                app.randomSong()
            }else{
                app.nextSong()
            }
            if(playControl.classList.length > 1){
                audio.play()
            }


        }
        preBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            }else{
                app.previousSong()
            }
            if(playControl.classList.length > 1){
                audio.play()
            }
        }

        // progress bar run when audio play
        audio.ontimeupdate = () => {
            if(audio.duration){
                const currentPercent = audio.currentTime * 100 / audio.duration
                progressBar.value = currentPercent
            }
        }//-------------------

        progressBar.onchange = (e) => {
            const seekTime = e.target.value *audio.duration / 100
            audio.currentTime = seekTime
        }
        // end audio
        audio.onended = () => {
            if(this.isRandom){
                this.randomSong()
                this.playSong()
            }else
            if(this.isRepeat){
                this.repeatSong()
            }else{
                this.nextSong()
                this.playSong()
            }
        }

        randomBtn.onclick = () => {
            randomBtn.classList.toggle('active')
            repeatBtn.classList.remove('active')
            this.isRandom = !this.isRandom
            this.isRepeat = false
        }

        repeatBtn.onclick = () => {
            repeatBtn.classList.toggle('active')
            randomBtn.classList.remove('active')
            this.isRepeat = !this.isRepeat
            this.isRandom = false
        }


        playlist.onclick = e => {
            if(!e.target.closest('.song.active')){
                this.activeSongWhenClick(e)
                this.playSong()
            }
            
        }

    },


    start(){
        this.defineProperties()
        this.handleEvents()
        this.renderSong()
        this.loadCurrentSong()
        
    }
}

app.start()