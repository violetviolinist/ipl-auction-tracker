import React from "react";
import { Accordion } from 'semantic-ui-react';
import axios from "axios";
import "./styles.css";
import PointsForm from "./PointsForm";
import RankList from './RankList';
export default class App extends React.Component {
  state = {
      rankList: null,
      players: [],

  };

  async componentDidMount() {
    await axios.get("/auction/rankList").then((response) => {
        this.setState({...this.state, rankList: response.data });
    });
    await axios.get('/auction/players').then(response => {
        this.setState({...this.state, players: response.data });
    });
  }

  render() {
    return (
        <React.Fragment>
            <RankList {...{
                rankList: this.state.rankList,
                players: this.state.players,
            }} />
        {   
            this.state.players && this.state.players.length &&
            <PointsForm players={this.state.players} />
        }
        </React.Fragment>
    );
  }
}