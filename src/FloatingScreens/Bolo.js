import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as Voice from "@react-native-voice/voice";

export default function Bolo() {
  const [recognized, setRecognized] = useState("");
  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
      console.log("onSpeechStart: ", e);
      setStarted("√");
    };

    Voice.onSpeechRecognized = (e) => {
      console.log("onSpeechRecognized: ", e);
      setRecognized("√");
    };

    Voice.onSpeechEnd = (e) => {
      console.log("onSpeechEnd: ", e);
      setEnd("√");
    };

    Voice.onSpeechError = (e) => {
      console.log("onSpeechError: ", e);
      setError(JSON.stringify(e.error));
    };

    Voice.onSpeechResults = (e) => {
      console.log("onSpeechResults: ", e);
      setResults(e.value || []);
    };

    Voice.onSpeechPartialResults = (e) => {
      console.log("onSpeechPartialResults: ", e);
      setPartialResults(e.value || []);
    };

    Voice.onSpeechVolumeChanged = (e) => {
      console.log("onSpeechVolumeChanged: ", e);
      setPitch(e.value);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // const requestPermission = async () => {
  //   if (Platform.OS === "android") {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const startSpeechToText = async () => {
    if (Voice) {
        try {
            await Voice.start('en-US');
            onSpeechStartHandler();
        } catch (error) {
            console.log(error);
        }
    }
};

const stopSpeechToText = async () => {
    if (Voice) {
        try {
            await Voice.stop();
            onSpeechEndHandler();
        } catch (error) {
            console.log(error);
        }
    }
};

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetStates();
  };

  const resetStates = () => {
    setRecognized("");
    setPitch("");
    setError("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
    setEnd("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Speech to Text </Text>
      <Text style={styles.instructions}>Press the button and start speaking.</Text>
      <Text style={styles.stat}>{`Started: ${started}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results:</Text>
      {results.map((result, index) => (
        <Text key={`result-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>Partial Results:</Text>
      {partialResults.map((result, index) => (
        <Text key={`partial-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>{`End: ${end}`}</Text>

      <TouchableHighlight onPress={startSpeechToText}>
        <Text style={styles.action}>🎤 Start</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={stopSpeechToText}>
        <Text style={styles.action}>🛑 Stop</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={cancelRecognizing}>
        <Text style={styles.action}>❌ Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={destroyRecognizer}>
        <Text style={styles.action}>🔥 Destroy</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 33,
  },
  welcome: {
    fontSize: 22,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 20,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 4,
  },
});
