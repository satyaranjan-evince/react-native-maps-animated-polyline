import React, { Component } from "react";
import MapView from "react-native-maps";

export default class AnimatedPolyline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      coords: []
    };
  }
  componentDidMount() {
    setTimeout(() =>
      this._animate(this.props.coordinates), this.props.delay || 0);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates !== this.props.coordinates) {
      setTimeout(() =>
        this._animate(nextProps.coordinates), nextProps.delay || 0);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.coords.length !== this.state.coords.length) {
      return true;
    }
    return false;
  }
  _animate(allCoords) {
    const self = this;
    const len = allCoords.length;
    let completed = 0;
    this.state.coords = [];
    let steps = parseInt((allCoords.length / 20), 10);
    if (steps == 0) {
      steps = steps + 1
    }
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const coords = this.state.coords.slice(0);
      for (let i = completed; i < (completed + steps) && i <= len; i += 1) {
        if (allCoords[i]) {
          coords.push(allCoords[i]);
        }
      }
      self.setState({ coords });
      if (completed >= len) {
        clearInterval(self.interval);
      }
      completed += steps;
    }, (this.props.interval || 10));
  }
  render() {
    return (
      <MapView.Polyline
        {...this.props}
        coordinates={[...this.state.coords]}
      />
    );
  }
}
