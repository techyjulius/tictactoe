import React, { Component } from 'react';
import Board from './components/board/board';
import Tile from './components/tile/tile';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Button from './components/button/button';
import Stats from './components/stats/stats';
import Message from './components/message/message';
import cloneDeap from 'clone-deep';
import {
    WINNING_TILES_COUNT,
    TOTAL_TILES_COUNT,
    FIRST_TILE_INDEX,
    MESSAGE_PLAYER_TURN,
    MESSAGE_WIN,
    MESSAGE_TIE
} from './constants/app-constants';
import './App.scss';

class App extends Component {
    initialState = {
        players: {
            X: {
                identifier: 'X',
                color: 'color-one',
                winsCount: 0,
                winningSetsClaimCount: []
            },
            O: {
                identifier: 'O',
                color: 'color-two',
                winsCount: 0,
                winningSetsClaimCount: []
            }
        },
        board: {
            winningSetsPool: [],
            winnerIdentifier: '',
            currentPlayerIdentifier: 'X',
            tiesCount: 0,
            filledTilesCount: 0,
            tilesPlayers: []
        },
        message: {},
    }
    
    state = cloneDeap(this.initialState);

    winningTileSets = [];

    componentDidMount() {
        this.init();
    }

    // Initialize state
    init = (maintainGameStats = false) => {
        let oldState = cloneDeap(this.state);
        let newState = cloneDeap(this.initialState);
        let message = this.setPlayTurnMessage(
            this.state.players[newState.board.currentPlayerIdentifier].color,
            newState.board.currentPlayerIdentifier
        );
        newState = this.setWinningTileSets(newState);
        newState.message = message;
        newState.board.tilesPlayers = Array.from(
            {length: TOTAL_TILES_COUNT},
            () => {
                return {
                    identifier: '',
                    additionalClasses: []
                }
            }
        )

        if (maintainGameStats) {
            newState.players.O.winsCount = oldState.players.O.winsCount;
            newState.players.X.winsCount = oldState.players.X.winsCount;
            newState.board.tiesCount = oldState.board.tiesCount;
        }

        this.setState(newState);
    }

    // Set winning combination sets of tiles
    setWinningTileSets = (state) => {
        let winningSetsClaimCount = [];
        this.winningTileSets = (this.winningTileSets.length === 0) ? this.getWinningTileSets() : this.winningTileSets;
        state.board.winningSetsPool = this.winningTileSets;
        winningSetsClaimCount = Array.from(
            {length: state.board.winningSetsPool.length},
            () => 0
        )
        state.players.O.winningSetsClaimCount = [...winningSetsClaimCount];
        state.players.X.winningSetsClaimCount = [...winningSetsClaimCount];
        return state;
    }

    setPlayTurnMessage = (color, player) => {
        return {
            type: MESSAGE_PLAYER_TURN,
            data: {
                color: color,
                player: player
            }
        };
    }

    setWinMessage = (color, player) => {
        return {
            type: MESSAGE_WIN,
            data: {
                color: color,
                player: player
            }
        };
    }

    setTieMessage = () => {
        return {
            type: MESSAGE_TIE,
            data: {}
        };
    }

    // Generate winning sets by row
    getRowWinningSets = () => {
        let rowWinningSets = [];

        for (let index = FIRST_TILE_INDEX; index < TOTAL_TILES_COUNT; index += WINNING_TILES_COUNT) {
            rowWinningSets.push(
                Array.from(
                    {length: WINNING_TILES_COUNT},
                    (el, elIndex) => elIndex + index
                )
            );
        }

        return rowWinningSets;
    }

    // Generate winning sets by column
    getColumnWinningSets = () => {
        let columnWinningSets = [];

        for (let index = FIRST_TILE_INDEX; index <= WINNING_TILES_COUNT; index++) {
            columnWinningSets.push(
                Array.from(
                    {length: WINNING_TILES_COUNT},
                    (el, elIndex) => (elIndex * WINNING_TILES_COUNT)  + index
                )
            );
        }

        return columnWinningSets;
    }

    // Generate winning sets by column
    getDiagonalWinningSets = () => {
        let diagonalWinningSet = [];

        diagonalWinningSet.push(
            Array.from(
                {length: WINNING_TILES_COUNT},
                (el, elIndex) => (elIndex * WINNING_TILES_COUNT)  + FIRST_TILE_INDEX + elIndex
            )
        );

        diagonalWinningSet.push(
            Array.from(
                {length: WINNING_TILES_COUNT},
                (el, elIndex) => ((elIndex * WINNING_TILES_COUNT)  + WINNING_TILES_COUNT) - elIndex
            )
        );

        return diagonalWinningSet;
    }

    getWinningTileSets = () => {
        let winningTileSets = [
            ...this.getRowWinningSets(),
            ...this.getColumnWinningSets(),
            ...this.getDiagonalWinningSets()
        ];

        return winningTileSets;
    }

    resetGame = () => {
        this.init();
    }

    rewindMoves = () => {
        this.init(true);
    }

    handleWin = (state, winningSetIndex) => {
        let currentPlayer = state.players[state.board.currentPlayerIdentifier];
        state.message = this.setWinMessage(
            currentPlayer.color,
            state.board.currentPlayerIdentifier
        );
        state.board.winningSetsPool[winningSetIndex].forEach((el) => {
            state.board.tilesPlayers[el].additionalClasses.push('tile--is-winning');
        });
        state.board.winnerIdentifier = currentPlayer.identifier;
        ++currentPlayer.winsCount;

        return state;
    }

    // Eliminate winning sets that are claimed by both users as one and only one use can win using any given set
    removeDoubleClaimedSets = (state, indexOfClaimedSet) => {
        state.players.O.winningSetsClaimCount.splice(indexOfClaimedSet, 1);
        state.players.X.winningSetsClaimCount.splice(indexOfClaimedSet, 1);
        state.board.winningSetsPool.splice(indexOfClaimedSet, 1);
        return state;
    }

    // Handle on tile click events
    onTileClick = (e) => {
        let state = cloneDeap(this.state);
        let tileIndex = parseInt(e.target.getAttribute('data-index'));
        let tilePlayer = state.board.tilesPlayers[tileIndex];

        if (tilePlayer.identifier === '' && state.board.winnerIdentifier === '') {
            let currentPlayer = state.players[state.board.currentPlayerIdentifier];
            tilePlayer.identifier = state.board.currentPlayerIdentifier;
            tilePlayer.additionalClasses.push('tile--' + currentPlayer.color + '-text');
            ++state.board.filledTilesCount;

            for (let i = 0; i < state.board.winningSetsPool.length; i++) {
                if (state.board.winningSetsPool[i].indexOf(tileIndex) !== -1) {
                    ++currentPlayer.winningSetsClaimCount[i];

                    if (currentPlayer.winningSetsClaimCount[i] === WINNING_TILES_COUNT) {
                        this.handleWin(state, i);
                        break;
                    }
                    else if (state.players.O.winningSetsClaimCount[i] > 0 && state.players.X.winningSetsClaimCount[i] > 0) {
                        state = this.removeDoubleClaimedSets(state, i);
                        --i;
                    }
                }
            }

            if (state.board.winnerIdentifier === '') {
                if (state.board.filledTilesCount === TOTAL_TILES_COUNT) {
                    ++state.board.tiesCount;
                    state.message = this.setTieMessage();
                } else {
                    state.board.currentPlayerIdentifier = (state.board.currentPlayerIdentifier === 'X') ? 'O' : 'X';
                    state.message = this.setPlayTurnMessage(
                        state.players[state.board.currentPlayerIdentifier].color,
                        state.board.currentPlayerIdentifier
                    );
                }
            }

            this.setState(state);
        }
    }

    render() {
        let tiles = [];
        if (this.state.board.tilesPlayers.length > 0) {
            for (let index = FIRST_TILE_INDEX; index < TOTAL_TILES_COUNT; index++) {
                tiles.push(
                    <Tile
                        key={index}
                        onTileClick={this.onTileClick}
                        ref={'tile' + index}
                        dataIndex={index}
                        playerOccupying={this.state.board.tilesPlayers[index].identifier}
                        additionalClasses={this.state.board.tilesPlayers[index].additionalClasses.join(' ')}></Tile>
                );
            }
        }

        return (
            <div className="app">
                <Header>Tic Tac Toe</Header>
                <section>
                    <div className="container container--center-content">
                        <Board>{tiles}</Board>
                        <Message details={this.state.message}/>
                        <div>
                            <Button onButtonClick={this.rewindMoves}>Rewind Moves</Button>
                            <Button onButtonClick={this.resetGame}>Reset Game</Button>
                        </div>
                        <Stats players={this.state.players}
                               tiesCount={this.state.board.tiesCount}/>
                    </div>
                </section>
                <Footer>&copy; 2019</Footer>
            </div>
        );
    }
}

export default App;
