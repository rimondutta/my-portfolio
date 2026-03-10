import { useState, useRef, useEffect } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import "./styles/MusicPlaylist.css";

const playlist = [
  {
    title: "Timeless",
    artist: "The Weeknd & Playboi Carti",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&h=100&auto=format&fit=crop",
    url: "/songs/The Weeknd  Timeless.mp3",
  },
  {
    title: "Let It Happen",
    artist: "Tame Impala",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=100&h=100&auto=format&fit=crop",
    url: "/songs/Tame Impala - Let It Happen.mp3",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&h=100&auto=format&fit=crop",
    url: "/songs/The Weeknd - Starboy.mp3",
  },
];

const MusicPlaylist = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs} `;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(playlist[currentTrack].url);
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, [currentTrack]);

  const togglePlay = (index: number) => {
    if (currentTrack === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * duration;
    }
  };

  return (
    <div className="music-playlist-box" data-cursor="disable">
      {/* Top Section: Active Player Info */}
      <div className="player-main-section">
        <div className={`large-album-art ${isPlaying ? "is-playing" : ""}`}>
          <img src={playlist[currentTrack].cover} alt={playlist[currentTrack].title} />
        </div>
        <div className="player-info-meta">
          <span className="active-title">{playlist[currentTrack].title}</span>
          <span className="active-artist">{playlist[currentTrack].artist}</span>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="player-controls-strip">
        <div className="progress-wrapper">
          <div className="progress-container" onClick={handleProgressClick}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-time-info">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="play-pause-btn" onClick={() => togglePlay(currentTrack)}>
          {isPlaying ? <MdPause size={32} /> : <MdPlayArrow size={32} />}
        </div>
      </div>

      {/* Bottom Section: Compact Playlist */}
      <div className="playlist-side-section">
        <span className="section-label">Playlist</span>
        <div className="music-list">
          {playlist.map((track, index) => (
            <div
              key={index}
              className={`music-item ${currentTrack === index ? "is-active" : ""}`}
              onClick={() => togglePlay(index)}
            >
              <div className="mini-art">
                <img src={track.cover} alt={track.title} />
              </div>
              <div className="item-info">
                <span className="item-title">{track.title}</span>
                <span className="item-artist">{track.artist}</span>
              </div>
              {currentTrack === index && isPlaying ? (
                <div className="playing-indicator">
                  <MdPause size={14} color="#14B8A6" />
                </div>
              ) : (
                <MdPlayArrow size={14} color="rgba(255,255,255,0.2)" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlaylist;
