import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';

TrackPlayer.setupPlayer({});

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'preview.mp3',
          path: RNFetchBlob.fs.dirs.DownloadDir + `/preview.mp3`, // Android platform
          description: 'Downloading the file',
      },
      // path : RNFetchBlob.fs.dirs.DocumentDir + `/musics/${track.title}`
    })
      .fetch('GET', 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3', {
        // Authorization: 'Bearer ' + access_token,
      })
      .progress((rec, tot) => {
        console.log(((rec / tot) * 100).toFixed() + ' %');
      })
      .then((res) => {
        console.log(RNFetchBlob.fs.dirs.DownloadDir + `/preview.mp3`);
        TrackPlayer.add({
          id: '1',
          url: RNFetchBlob.fs.dirs.DownloadDir + `/preview.mp3`,
          title: 'thisSong.title',
          artist: 'NQT',
        });
      });
    // TrackPlayer.add({
    //   id: '1',
    //   url:
    //     'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    //   title: 'thisSong.title',
    //   artist: 'NQT',
    // });
  }, []);
  const playMusic = async () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  return (
    <>
      <View>
        <Text>Hlw</Text>
        {isPlaying ? (
          <Button title="Pause" onPress={() => playMusic()}></Button>
        ) : (
          <Button title="Play" onPress={() => playMusic()}></Button>
        )}
      </View>
    </>
  );
};

export default App;
