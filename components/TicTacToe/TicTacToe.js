import styles from "./TicTacToe.module.css";
import { useEffect, useState } from "react";

const Win_Combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
export default function TicTacToe() {
    const [xTurn, setXTurn] = useState(true);
    const [won, setWon] = useState(false);
    const [isDraw, setIsDraw] = useState(false);
    const [wonCombo, setWonCombo] = useState([]);
    const [board, setBoard] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
    })
    const [wonTitle, setWonTitle] = useState('')
    const [modalTitle, setModalTitle] = useState("")

    useEffect(() => {
        checkWinner();
        checkDraw();
    }, [board]);
    const updateBoardData = (idx) => {
        if (!board[idx] && !won) {
            let value = xTurn === true ? "X" : "O";
            setBoard({ ...board, [idx]: value });
            setXTurn(!xTurn);
        }
    };
    const checkDraw = () => {
        let check = Object.keys(board).every((v) => board[v]);
        setIsDraw(check);
        if (check) setModalTitle("Match Draw!!!!")
    };
    const checkWinner = () => {
        Win_Combo.map((bd) => {
            const [a, b, c] = bd;
            if (board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!`);
                return;
            }
        });
    };
    const reset = () => {
        setBoard({
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
        })
        setXTurn(true)
        setWon(false)
        setIsDraw(false)
        setWonCombo([])
        setModalTitle("")
    }
    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="game">
                <div className="gamemenu">
                    <p>{xTurn === true ? "X" : "O"}</p>
                </div>
                <div className="gameboard">
                    {[...Array(9)].map((v, idx) => {
                        return <div onClick={() => {updateBoardData(idx)}} key={idx} className="square">
                            {board[idx]}
                        </div>;
                    })}
                </div>
                <div className={`modal ${modalTitle ? "show" : ""}`}>
                    <div className="model_title"> {modalTitle}</div>
                    <button onClick={reset}>New Game</button>
                </div>
            </div>


        </div>
    )
}