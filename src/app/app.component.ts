import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Hls from "hls.js";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'hls';

  
  
  @ViewChild('playerContainer',{ static: false }) playerContainerRef!: ElementRef;
  private audioElement!: HTMLAudioElement;
  // isPlaying = false;
  listenCount:number = 0;
  constructor(private renderer:Renderer2) {}
  

  
      


    
      
    ngAfterViewInit() {

// *******3******

  const container = this.playerContainerRef.nativeElement;

 this.audioElement = this.renderer.createElement('audio');

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  hls.attachMedia(this.audioElement);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    console.log('HLS manifest parsed');
  });
} else if (this.audioElement.canPlayType('application/vnd.apple.mpegurl')) {
  this.audioElement.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
} else {
  console.log('HLS is not supported');
}
}

play() {
this.audioElement.play();
}

pause() {
this.audioElement.pause();
}

skip(seconds: number) {
this.audioElement.currentTime += seconds;
}

getProgress(): string {
  return (this.audioElement.currentTime / this.audioElement.duration * 100) + '%';
}





   
    
  
  

  ngOnInit(): void {


  };

  // play() {
  //   this.audioElement.play();
  //     // this.audioElement.controls = true;

  // }
  // togglePlayPause() {
  //   const audioPlayer = this.playerContainerRef.nativeElement;
  //   if (audioPlayer.paused) {
  //     audioPlayer.play();
  //     this.audioElement.play();
  //     this.listenCount++  	
  //     this.isPlaying = true;
   
  //   } else {
  //     audioPlayer.pause();
  //     this.isPlaying = false;
  //     this.listenCount--
  //   }
  // }
}
