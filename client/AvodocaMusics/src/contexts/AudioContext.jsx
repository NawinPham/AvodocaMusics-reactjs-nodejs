import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { AuthContext } from "./AuthContext";
import getIdSongFetchData from "../hooks/getIdSongFetchData";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [listSongData, setListSongData] = useState([]);
  const [btnPlayPause, setBtnPlayPause] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const { songData } = getIdSongFetchData(currentSong);

  const audioRef = useRef(null);
  const songDuration = useRef(0);

  useEffect(() => {
    if (audioRef.current) {
      const updateCurrentTime = () =>
        setCurrentTime(audioRef.current.currentTime);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);

      return () =>
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setBtnPlayPause(true);
    } else {
      audioRef.current.pause();
      setBtnPlayPause(false);
    }
  };

  const playNewSong = async (song_id, list_Song_Data = [], songIndex = 0) => {
    if (song_id) {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause any currently playing audio

        setListSongData(list_Song_Data);

        setCurrentSongIndex(songIndex);

        // Set the new source
        setCurrentSong(song_id);
        audioRef.current.load();

        audioRef.current.onloadedmetadata = () => {
          songDuration.current = audioRef.current.duration; // Set song duration
        };

        audioRef.current.oncanplaythrough = () => {
          audioRef.current
            .play()
            .catch((error) => console.error("Audio play error: ", error));
        };

        audioRef.current.onerror = (error) => {
          console.error("Audio load error: ", error);
        };

        audioRef.current.onended = () => {
          playNextSong(); // Play next song when current ends
        };

        const createHistory = await postRequest(
          `${baseUrl}/historyListens/create/${song_id}`,
          null,
          user?.token
        );
        if (createHistory.error) {
          console.log("...");
        }

        setBtnPlayPause(true);
      } else {
        console.log("Không có bài hát");
      }
    }
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % listSongData.length;
    const nextSong = listSongData[nextIndex];

    playNewSong(nextSong.songs_id, listSongData, nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + listSongData.length) % listSongData.length;
    const prevSong = listSongData[prevIndex];

    playNewSong(prevSong.songs_id, listSongData, prevIndex);
  };

  // Seek to a specific time in the song
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * songDuration.current;
    audioRef.current.currentTime = seekTime;
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        audioRef,
        playNewSong,
        songData,
        btnPlayPause,
        togglePlayPause,
        playNextSong,
        playPreviousSong,
        handleSeek,
        currentTime,
        songDuration: songDuration.current, // Provide the ref value to the context
      }}
    >
      {children}
      <audio
        onEnded={playNextSong}
        ref={audioRef}
        src={`${baseUrl}/songs/play/${currentSong}`}
      />
    </AudioContext.Provider>
  );
};
