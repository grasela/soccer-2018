import React from "react";
import moment from "moment";

class Match extends React.Component {
  render() {
    let homeResult = this.props.home_result;
    let awayResult = this.props.away_result;

    let date = moment(this.props.date).format("MMMM Do YYYY, h:mm:ss a");
    
    if (homeResult === 0) {
      homeResult = "0";
    }

    if (awayResult === 0) {
      awayResult = "0";
    }
    return (
      <div className="game">
        <h1>{this.props.group.name}</h1>
        <h2>{date}</h2>
        <div className="score">
          <div></div>
          <div className="vs">STADIUM</div>
          <div></div>
        </div>

        <div className="score">
          <div>{awayResult || "Not yet played "}</div>
          <div className="vs">
            <h3>{this.props.stadium.city}</h3>
          </div>
          <div>{homeResult || "Not yet played"}</div>
        </div>

        <div className="score">
          <div>
            <strong>{this.props.away_team.name}</strong>
          </div>
          <div className="vs"> VS </div>
          <div>
            <strong>{this.props.home_team.name}</strong>
          </div>
        </div>

        <div className="score">
          <div>
            <img src={this.props.away_team.flag} />
          </div>
          <div className="vs" />
          <div>
            <img src={this.props.home_team.flag} />
          </div>
        </div>
      </div>
    );
  }
}
export default Match;
