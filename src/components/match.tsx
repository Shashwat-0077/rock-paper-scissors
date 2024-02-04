import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/main.module.scss";
import Scissors from "@/SVGS/scissors";
import Spock from "@/SVGS/spock";
import Paper from "@/SVGS/paper";
import Lizard from "@/SVGS/lizard";
import Rock from "@/SVGS/rock";
import useStore, { ChoiceType } from "@/store/store";

export default function Match(props: { children: React.ReactNode }) {
    const { children } = props;
    const [isTimeout, setIsTimeout] = useState(false);

    const { yourChoice, setYourChoice } = useStore((state) => ({
        yourChoice: state.yourChoice,
        setYourChoice: state.setYourChoice,
    }));

    const previousChoice = useStore((state) => state.previousChoice);
    const houseChoice = useStore((state) => state.houseChoice);
    const changeScoreBy = useStore((state) => state.changeScoreBy);

    const result = getResult(yourChoice || previousChoice, houseChoice);

    useEffect(() => {
        setTimeout(() => {
            setIsTimeout(true);
        }, 1000);
    });

    useEffect(() => {
        if (result === "YOU WON") changeScoreBy(1);
        else if (result === "YOU LOSE") changeScoreBy(-1);
    }, [result, changeScoreBy]);

    return (
        <motion.div
            className={`${styles.match} ${isTimeout ? styles.reduce : ""}`}
            initial={{ y: "20%", opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-20%", opacity: 0, scale: 0 }}
        >
            <div className={styles.your_choice}>
                <h2>YOU PICKED</h2>
                <div>
                    <div
                        className={`${styles.bigCircle} ${
                            result === "YOU WON" ? styles.show : ""
                        }`}
                    ></div>
                    <div
                        className={`${styles.mediumCircle} ${
                            result === "YOU WON" ? styles.show : ""
                        }`}
                    ></div>
                    <div
                        className={`${styles.smallCircle} ${
                            result === "YOU WON" ? styles.show : ""
                        }`}
                    ></div>
                    {children}
                </div>
            </div>

            <motion.div
                className={`${styles.result} ${isTimeout ? styles.show : ""}`}
            >
                <h1>{result}</h1>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setYourChoice("");
                    }}
                >
                    PLAY AGAIN
                </button>
            </motion.div>

            <div className={styles.house_choice}>
                <h2>THE HOUSE PICKED</h2>
                <div>
                    <div
                        className={`${styles.bigCircle} ${
                            result === "YOU LOSE" ? styles.show : ""
                        }`}
                    ></div>
                    <div
                        className={`${styles.mediumCircle} ${
                            result === "YOU LOSE" ? styles.show : ""
                        }`}
                    ></div>
                    <div
                        className={`${styles.smallCircle} ${
                            result === "YOU LOSE" ? styles.show : ""
                        }`}
                    ></div>
                    {houseChoice === "scissors" ? (
                        <Scissors />
                    ) : houseChoice === "spock" ? (
                        <Spock />
                    ) : houseChoice === "paper" ? (
                        <Paper />
                    ) : houseChoice === "lizard" ? (
                        <Lizard />
                    ) : houseChoice === "rock" ? (
                        <Rock />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Rules :

// scissors -> paper , lizard
// paper -> rock , spock
// rock -> lizard , scissors,
// lizard -> spock , paper
// spock -> scissors , rock

function getResult(yourChoice: ChoiceType, houseChoice: ChoiceType): String {
    const YOU_WON = "YOU WON";
    const YOU_LOSE = "YOU LOSE";
    const DRAW = "DRAW";
    if (yourChoice === houseChoice) return DRAW;

    if (
        yourChoice === "scissors" &&
        (houseChoice === "paper" || houseChoice === "lizard")
    )
        return YOU_WON;
    if (
        yourChoice === "paper" &&
        (houseChoice === "rock" || houseChoice === "spock")
    )
        return YOU_WON;

    if (
        yourChoice === "rock" &&
        (houseChoice === "lizard" || houseChoice === "scissors")
    )
        return YOU_WON;

    if (
        yourChoice === "lizard" &&
        (houseChoice === "spock" || houseChoice === "paper")
    )
        return YOU_WON;

    if (
        yourChoice === "spock" &&
        (houseChoice === "scissors" || houseChoice === "rock")
    )
        return YOU_WON;

    return YOU_LOSE;
}
