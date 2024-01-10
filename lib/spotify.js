import axios from 'axios';

const buff = Buffer.from('2c7696984ac54199b55725cdf4425525' + ':' + 'a1ef2976efc04628bd4d47c5975e6c55');
const base64data = buff.toString('base64');

let isRequesting = false;
let requestsMade = 0;
async function SpotifyServer () {

    if (isRequesting) { return }
    isRequesting = true;

    // GET SAVED REFRESH_TOKEN
    const response = 'AQC8a0UjKANHvvx47tj1RNB8YO_kZLtX46QIHhfTozsM7BfCLXiEoovNhEGiRdjM2PhLeH_0itZE5W6KI1p0al5uXIy9GO5P3pgCB4oNXORlnYOlsqnZSXKb7lPb_47qTws'
    const refresh_token = response
    if (refresh_token && refresh_token !== "") {

        // GET NEW ACCESS_TOKEN
        // const options1 = {
        //     url : 'https://accounts.spotify.com/api/token',
        //     method : 'post',
        //     headers : {
        //         authorization : `Basic ${base64data}`,
        //         'Content-Type' : 'application/x-www-form-urlencoded'
        //     },
        //     params : {
        //         grant_type : 'refresh_token',
        //         refresh_token : refresh_token
        //     }
        // }

        // let access_token = "";
        // try {
        //   const auth         = await axios(options1);
        //         access_token = auth.data.access_token;
        // } catch (e) {
        //   console.error("refresh_token request error");
        //   console.error(e.message);
        // }

        let access_token;
        access_token = "BQDnhxUKcwVTGFvKkmhqJ4Jd_lX6-Jg79gIh0p0zLJjbLbV4604RcBDDK1gRXd_g3QgHhzes6rK3OiCTqOuv77_URNIkaNvv12CRycvBo67l5qh8uMHujs2uMdVSeSw8ZxCG-TmVMyje_rbBk48gd61y0duj4D-iU3JB_SgoGdzv9tYXQH_W_WYXZB3R3hJb2o1PzNQxD_4"

        // REQUEST CURRENTLY PLAYING SONG DATA
        const options2 = {
            url : 'https://api.spotify.com/v1/me/player/currently-playing',
            method : 'get',
            headers : {
                authorization : `Bearer ${access_token}`
            }
        }

        let trackInformation = {};
        try {
          trackInformation = await axios(options2);
        } catch (e) {
          console.error("currently-playing request error");
          console.error(e.message);
        }

        if (trackInformation.data) {
            // WRITE TRACK INFORMATIONS TO FILE
            // songData.progress_time = trackInformation.data.progress_ms;
            // songData.duration_time = trackInformation.data.item.duration_ms;
            // songData.name          = trackInformation.data.item.name;
            // songData.image         = trackInformation.data.item.album.images[0].url;
            const artist        = trackInformation.data.item.artists[0].name;
            const song          = trackInformation.data.item.name;
            const album         = trackInformation.data.item.album.name;
            const progress_ms   = trackInformation.data.progress_ms;
            const duration_ms   = trackInformation.data.item.duration_ms;
            const progress_time = millisToMinutesAndSeconds(progress_ms);
            const duration_time = millisToMinutesAndSeconds(duration_ms);
            const text          = `${progress_time} / ${duration_time} - ${song} by ${artist}`;
            const image        = trackInformation.data.item.album.images[0].url;
            requestsMade++;
            isRequesting = false;
            return { progress_time, duration_time, song, image, artist};

        } else {
            console.log('Looks like you are not playing anyting at the moment.');
            isRequesting = false;
        }


    } else {
        console.clear();
        console.log('Please authorize first.');
        console.log('Open http://localhost:8888/login in your browser.')
        isRequesting = false;
    }
}

setInterval(SpotifyServer, 1200);

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default SpotifyServer;
export const songData = {
    progress_time: null,
    duration_time: null,
    name: null,
    image: null,
  };