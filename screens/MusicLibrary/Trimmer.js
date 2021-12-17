import React, { Component } from "react";
import { View, Button } from "react-native";
import Trimmer from "react-native-trimmer";
import { connect } from "react-redux";
import { Audio } from "expo-av";

const maxTrimDuration = 15000;
const minimumTrimDuration = 15000;
const totalDuration = 180000;

const initialLeftHandlePosition = 0;
const initialRightHandlePosition = 15000;

const scrubInterval = 50;

export class TrimmerC extends Component {
  state = {
    playing: false,
    trimmerLeftHandlePosition: initialLeftHandlePosition,
    trimmerRightHandlePosition: initialRightHandlePosition,
    scrubberPosition: initialLeftHandlePosition,
    soundObj: null,
    playBackObj: null,
    audio: null,
  };

  playScrubber = () => {
    this.setState({ playing: true });

    this.scrubberInterval = setInterval(() => {
      this.setState({
        scrubberPosition: this.state.scrubberPosition + scrubInterval,
      });
    }, scrubInterval);
  };

  pauseScrubber = () => {
    clearInterval(this.scrubberInterval);

    this.setState({
      playing: false,
      scrubberPosition: this.state.trimmerLeftHandlePosition,
    });
  };

  onHandleChange = ({ leftPosition, rightPosition }) => {
    this.setState({
      trimmerRightHandlePosition: rightPosition,
      trimmerLeftHandlePosition: leftPosition,
    });
    const stateTrimmer = {
      trimLeft: leftPosition,
      trimRight: rightPosition,
    };
    this.props.setSongConfig(stateTrimmer);
    if (this.state.soundObj.isLoaded) {
      console.log(this.state.soundObj.positionMillis); //shouldPlay: false,
      this.setState({ ...this.state, scrubberPosition: leftPosition });
      this.state.playBackObj.setStatusAsync({
        shouldPlay: true,
        positionMillis: leftPosition,
      });
    }
  };

  onScrubbingComplete = (newValue) => {
    this.setState({ playing: false, scrubberPosition: newValue });
  };

  async componentDidMount() {
    this.playSound();
  }

  async componentDidUpdate(prevProps) {
    if (this.state.scrubberPosition === this.state.trimmerRightHandlePosition) {
      this.state.playBackObj.setStatusAsync({ shouldPlay: false });
    }
  }

  playSound = async () => {
    if (this.state.soundObj === null) {
      const playbackObj = new Audio.Sound();
      playbackObj.setOnPlaybackStatusUpdate;
      const status = await playbackObj.loadAsync(
        { uri: this.props.music },
        { shouldPlay: true }
      );

      this.setState({
        ...this.state,
        soundObj: status,
        playBackObj: playbackObj,
      });
    }
    this.playScrubber();
  };

  render() {
    const {
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
      scrubberPosition,
      playing,
    } = this.state;

    return (
      <View>
        <Trimmer
          onHandleChange={this.onHandleChange}
          totalDuration={totalDuration}
          trimmerLeftHandlePosition={trimmerLeftHandlePosition}
          trimmerRightHandlePosition={trimmerRightHandlePosition}
          minimumTrimDuration={minimumTrimDuration}
          maxTrimDuration={maxTrimDuration}
          maximumZoomLevel={2} //200
          zoomMultiplier={2} //20
          initialZoomValue={2} //2
          scaleInOnInit={true}
          tintColor="#000000"
          markerColor="#1A1A1C"
          trackBackgroundColor="#FFCB37"
          trackBorderColor="#FFCB37"
          onLeftHandlePressIn={() => console.log("onLeftHandlePressIn")}
          onRightHandlePressIn={() => console.log("onRightHandlePressIn")}
          scrubberColor="#000000"
          scrubberPosition={scrubberPosition}
          onScrubbingComplete={this.onScrubbingComplete}
          onScrubberPressIn={() => console.log("onScrubberPressIn")}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    music: state.music.audio,
    store: state.music,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSongConfig: (config) => {
      dispatch({
        type: "music/setSongConfig",
        payload: config,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrimmerC);
