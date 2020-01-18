import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
import MuiThemePrivider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Jyanken from './components/Jyanken'

class JyankenGamePage extends Component {
    constructor(props) {
        super(props)
        this.jyanken = new Jyanken()
        this.state = {scores: [], status: []}
    }

    componentDidMount(){
        this.getResult()
    }

    getResult(){
        this.setState({scores: this.jyanken.getScores()})
        this.setState({status: this.jyanken.getStatuses()})
    }

    pon(te){
        this.jyanken.pon(te)
        this.getResult()
    }

    render(){
        const tabStyle = {width: 200, height: 50, textAlign: 'center', color: '#fff', backgroundColor: '#01bcd4'}
        const activeStyle = (path) => Object.assign({borderBottom: `solid 4px ${this.props.location.pathname.match(path) ? '#f00' : '#01bcd4'}`}, tabStyle)
        return(
            <MuiThemePrivider>
                <div style={{marginLeft: 30}}>
                    <Header>じゃんけん</Header>
                    <JyankenBox actionPon={(te) => this.pon(te)} />
                    <Paper style={{width: 400}} zDepth={2}>
                        <Link to="/scores"><FlatButton id="tab-score" label="対戦結果" style={activeStyle('scores')} /></Link>
                        <Link to="/status"><FlatButton id="tab-status" label="対戦成績" style={activeStyle('status')} /></Link>
                        <Route path="/scores" component={() => <ScoreList scores={this.state.scores} />}/>
                        <Route path="/status" component={() => <StatusBox status={this.state.status} />}/>
                        <Route exact path="/" component={() => <Redirect to="/scores" />}/>
                    </Paper>
                </div>
            </MuiThemePrivider>
        )
    }
}

JyankenGamePage.propTypes = {
    location: PropTypes.object
}

const Header = (props) => (
    <h1>{props.children}</h1>
)

Header.propTypes = {
    children: PropTypes.string
}

const StatusBox = (props) => (
    <Table>
        <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
                <TableHeaderColumn>勝ち</TableHeaderColumn><TableHeaderColumn style={judgementStyle(1)}>{props.status.win}</TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={false}>
                <TableHeaderColumn>負け</TableHeaderColumn><TableHeaderColumn style={judgementStyle(2)}>{props.status.lose}</TableHeaderColumn>
            </TableRow>
            <TableRow displayBorder={false}>
                <TableHeaderColumn>引き分け</TableHeaderColumn><TableRowColumn style={judgementStyle(0)}>{props.status.draw}</TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
)

StatusBox.propTypes = {
    status: PropTypes.object
}

const JyankenBox = (props) => {
    const style = {marginLeft: 20}
    return (
        <div style={{marginTop: 40, marginBottom: 30, marginLeft: 30}}>
            <RaisedButton id="btn-gu" label="グー" onClick={() => props.actionPon(0)} style={style}></RaisedButton>
            <RaisedButton id="btn-choki" label="チョキ" onClick={() => props.actionPon(1)} style={style}></RaisedButton>
            <RaisedButton id="btn-pa" label="パー" onClick={() => props.actionPon(2)} style={style}></RaisedButton>
        </div>
    )
}

JyankenBox.propTypes = {
    actionPon: PropTypes.func
}

const ScoreList = (props) => (
    <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn>時間</TableHeaderColumn><TableHeaderColumn>人間</TableHeaderColumn><TableHeaderColumn>CPU</TableHeaderColumn><TableHeaderColumn>結果</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props.scores.map((score, ix) => <ScoreListItem key={ix} scores={score} />)}
        </TableBody>
    </Table>
)

ScoreList.propTypes = {
    scores: PropTypes.array
}

const ScoreListItem = (props) => {
    const teString = ["グー", "チョキ", "パー"]
    const judgementString = ["引き分け", "勝利", "敗北"]
    const dateHHMMSS = (d) => d.toTimeString().substr(0, 8)
    return (
        <TableRow style={judgementStyle(props.scores.judgement)}>
            <TableRowColumn>{dateHHMMSS(props.scores.created_at)}</TableRowColumn>
            <TableRowColumn>{teString[props.scores.human]}</TableRowColumn>
            <TableRowColumn>{teString[props.scores.computer]}</TableRowColumn>
            <TableRowColumn>{judgementString[props.scores.judgement]}</TableRowColumn>
        </TableRow>
    )
}

ScoreListItem.propTypes = {
    scores: PropTypes.object
}

const judgementStyle = (judgement) => (
    {color: ["#000", "#FF1744", "#2979FF"][judgement]}
)

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={JyankenGamePage} />
    </BrowserRouter>,
    document.getElementById('root')
)