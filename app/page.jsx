'use client';

import React from 'react'
import { Button } from '@components/ui/button'
// import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import SpotifyWebApi from 'spotify-web-api-node';
// import spotify.js from lib/spotify.js
import SpotifyServer from '@lib/spotify';
import { songData } from '@lib/spotify';

import { useState, useEffect } from 'react';



const page = () => {

  // useEffect(() => {
  //   const audio = new Audio('/oldtown.mp');
  //   audio.addEventListener('loadeddata', () => {
  //     audio.play();
  //     audio.volume = 0.1;
  //   });
  // }, []);


  //

  const [progressTime, setProgressTime] = useState(null);
  const [durationTime, setDurationTime] = useState(null);
  const [songImage, setSongImage] = useState(null);
  const [songName, setSongName] = useState(null);
  const [songText, setSongText] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await SpotifyServer();
      if (data2) {
        console.log('Data: ' + data2.progress_time);
        setDurationTime(data2.duration_time);
        setProgressTime(data2.progress_time);
        setSongImage(data2.image);
        setSongName(data2.song);
        setSongText(data2.artist);
      } else {
        console.log('Failed to fetch data');
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  


  return (
    <main className='flex container mx-auto py-20'>
        <section className='grid grid-cols-5 gap-4 grid-rows-1'>
          <div className='flex flex-col gap-1 col-span-2 row-span-1'>
            <Card className='glassmorphism'>
              <CardHeader>
                <CardTitle className="sizeIncrease">Hello, I'm  <span className='cardTitle'>Breeze</span></CardTitle>
                <CardDescription>I'm a Full Stack Web Developer and I love to make things around topics I enjoy or are interested in! I have been programming for over 5 years and plan to pursue a career in this field.</CardDescription>
              </CardHeader>

              <CardContent>

              </CardContent>

              <CardFooter>
                <Button className='glassmorphism ' href='x.com'>Twitter</Button>
                <Button className='glassmorphism ml-3' href='x.com'>Github</Button>
                <Button className='glassmorphism ml-3' href='x.com'>Discord</Button>
              </CardFooter>
            </Card>
          </div>

          <div className='flex flex-col gap-1 col-span-1 row-span-1'>
            <Card className='glassmorphism'>
              <CardHeader>
                <CardTitle className="">Spotify</CardTitle>
                <CardDescription>What I am currently listening to on Spotify</CardDescription>
              </CardHeader>

              <CardContent>
                <div className='flex items-center justify-center'>
                  <img src={songImage} className='rounded-lg mb-1' style={{ width: '75px', height: '75px' }} />
                </div>
                <p className='text-center text-muted-foreground'>{songName}</p>
                <p className='text-center text-muted-foreground'>{songText}</p>
                <div className='flex flex-row justify-center'>
                  <div className='flex flex-col'>
                    <p className='text-center text-muted-foreground'>{progressTime} - {durationTime}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        </section>
    </main>
  )
}

export default page