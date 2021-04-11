import React from "react";
import axios from "axios";
import "./styles.css";
import PointsForm from "./PointsForm";

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
        {
            this.state.rankList && 
            <table class="styled-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.rankList.map((participant, index) => {
                        return (
                            <tr>
                                <td>#{index+1}</td>
                                <td>{participant.name}</td>
                                <td>{participant.score}</td>
                            </tr>
                        );
                    })
                }  
            </tbody>
        </table>
        }
        {   
            this.state.players && this.state.players.length &&
            <PointsForm players={this.state.players} />
        }
        </React.Fragment>
    );
  }
}