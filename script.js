const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Baby Shark',
        'name': 'Baby Shark.mp4',
        'duration': '2:16',
    },
    {
        'id': 'a2',
        'title': 'MINIONS',
        'name': 'MINIONS Clip.mp4',
        'duration': '2:45',
    },
    {
        'id': 'a3',
        'title': 'Mr Bean',
        'name': 'Mr Bean.mp4',
        'duration': '24:49',
    },

    {
        'id': 'a4',
        'title': 'Tom and Jerry',
        'name': 'Tom Jerry.mp4',
        'duration': '3:59',
    },
    {
        'id': 'a5',
        'title': 'Kid and Kat',
        'name': 'Wildbrain.mp4',
        'duration': '4:25',
    },
    // {
    //     'id': 'a6',
    //     'title': 'embed google map to contact form',
    //     'name': 'embed google map to contact form.mp4',
    //     'duration': '5:33',
    // },
    // {
    //     'id': 'a7',
    //     'title': 'password strength checker javascript web app',
    //     'name': 'password strength checker javascript web app.mp4',
    //     'duration': '0:29',
    // },

    // {
    //     'id': 'a8',
    //     'title': 'custom range slider',
    //     'name': 'custom range slider.mp4',
    //     'duration': '1:12',
    // },
    // {
    //     'id': 'a9',
    //     'title': 'animated shopping cart',
    //     'name': 'animated shopping cart.mp4',
    //     'duration': '3:38',
    // },

];

data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="images/play.svg" alt="">
                    <p>${i + 1 > 5 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})
// responsiveVoice.setDefaultVoice("Hindi Male");
responsiveVoice.speak("Hey, Kid welcome to the Cartoon Page "+"You can also change the video either saying title of the video or you can also navigate through next and previous");
responsiveVoice.speak("You have five cartoons namely BabyShark,Minions,MrBean,Tomandjerry and KidandKat to select within so tell me what do you want to play now");


let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});
// if (annyang) {
//     // Define the commands object
//     const commands = {};

//     // Loop through the data and create a command for each video title
//     data.forEach((video) => {
//         commands[video.title.toLowerCase()] = () => {
//             // Remove the 'active' class and change the 'img' source of all videos in the playlist
//             for (all_videos of videos) {
//                 all_videos.classList.remove('active');
//                 all_videos.querySelector('img').src = 'images/play.svg';
//             }

//             // Find the corresponding video element in the playlist based on the 'id' of the selected video
//             const selected_video = [...videos].find(
//                 (playlist_video) => playlist_video.dataset.id === video.id
//             );

//             // Add the 'active' class and change the 'img' source of the selected video
//             selected_video.classList.add('active');
//             selected_video.querySelector('img').src = 'images/pause.svg';

//             // Update the 'src' attribute of the main video element and change the title of the video
//             main_video.src = 'videos/' + video.name;
//             main_video_title.innerHTML = video.title;
//         };
//     });

//     // Add the commands to annyang
//     annyang.addCommands(commands);

//     // Start listening
//     annyang.start();
// }
if (annyang) {
    // Define voice commands
    var commands = {
      'play': function() {
        main_video.play();
      },
      'pause': function() {
        main_video.pause();
      },
      'next': function() {
        let current_video = document.querySelector('.video.active');
        let next_video = current_video.nextElementSibling || videos[0];
        next_video.click();
      },
      'previous': function() {
        let current_video = document.querySelector('.video.active');
        let previous_video = current_video.previousElementSibling || videos[videos.length - 1];
        previous_video.click();
      },
      'play *title': function(title) {
        let video_to_play = data.find(video => video.title.toLowerCase() === title.toLowerCase());
        if (video_to_play) {
          let video_element = document.querySelector(`.video[data-id="${video_to_play.id}"]`);
          video_element.click();
          main_video.play(); // autoplay the video
        }
      }
    };
  
    // Add voice commands to annyang
    annyang.addCommands(commands);
  
    // Start listening for voice commands
    annyang.start();
  }