"use client";

// ?INFO: This project can further be improved, there are *many* things that can be optimized, some things are total chaos, for example: type of yourChoice variable, we can change the yourChoice into an array, then we can do the operation on that basis but then i need to change the whole animation logic, this is small side project i made for fun, i might fix it later ;)

//! BUG LIST :
//! 1 :  There is a bug when you reload the page and instantly you click on any choice , it will break the animation

import styles from "@/styles/main.module.scss";
import Lizard from "@/SVGS/lizard";
import Logo from "@/SVGS/logo";
import Paper from "@/SVGS/paper";
import Pentagon from "@/SVGS/pentagon";
import Rock from "@/SVGS/rock";
import Scissors from "@/SVGS/scissors";
import Spock from "@/SVGS/spock";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Match from "@/components/match";
import useStore from "@/store/store";
import FullScreenWrapper from "@/components/FullScreenWrapper";

export default function Home() {
    const [randomNumber, setRandomNumber] = useState(999);
    const [firstComponent, setFirstComponent] = useState(true);
    const [secondComponent, setSecondComponent] = useState(true);

    const setHouseChoice = useStore((state) => state.setHouseChoice);

    const { yourChoice, setYourChoice } = useStore((state) => ({
        yourChoice: state.yourChoice,
        setYourChoice: state.setYourChoice,
    }));

    const previousChoice = useStore((state) => state.previousChoice);
    const score = useStore((state) => state.score);

    useEffect(() => {
        if (yourChoice !== "") {
            setRandomNumber(Math.floor(Math.random() * 5));
            {
                randomNumber === 0
                    ? setHouseChoice("scissors")
                    : randomNumber === 1
                    ? setHouseChoice("spock")
                    : randomNumber === 2
                    ? setHouseChoice("paper")
                    : randomNumber === 3
                    ? setHouseChoice("lizard")
                    : randomNumber === 4
                    ? setHouseChoice("rock")
                    : "";
                ``;
            }

            setSecondComponent(true);
            setTimeout(() => {
                setFirstComponent(false);
            }, 500);
        }

        if (yourChoice === "") {
            setFirstComponent(true);
            setTimeout(() => {
                setSecondComponent(false);
            }, 500);
        }
    }, [yourChoice, randomNumber, setHouseChoice]);

    return (
        <FullScreenWrapper>
            <div>
                <div className={styles.header}>
                    <Logo className={styles.logo} />
                    <section className={styles.scorecard}>
                        <p className={styles.txt}>SCORE</p>
                        <p className={styles.score}>{score}</p>
                    </section>
                </div>

                <AnimatePresence>
                    {!secondComponent ? (
                        <motion.div
                            key="move_picker"
                            initial={{ y: "20%", opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: "-20%", opacity: 0, scale: 0 }}
                            className={styles.move_picker}
                        >
                            <Pentagon className={styles.pentagon} />
                            <Scissors setYourChoice={setYourChoice} />
                            <Spock setYourChoice={setYourChoice} />
                            <Paper setYourChoice={setYourChoice} />
                            <Lizard setYourChoice={setYourChoice} />
                            <Rock setYourChoice={setYourChoice} />
                        </motion.div>
                    ) : (
                        ""
                    )}
                    {!firstComponent ? (
                        // ?INFO : when the yourChoice changes, nothing is passed as a child, so the nothing is displayed when you click "PLAY AGAIN", to solve that we use previous state to check what was the previous state so that we can render the same thing

                        <Match>
                            {yourChoice === "scissors" ||
                            previousChoice === "scissors" ? (
                                <Scissors />
                            ) : yourChoice === "spock" ||
                              previousChoice === "spock" ? (
                                <Spock />
                            ) : yourChoice === "paper" ||
                              previousChoice === "paper" ? (
                                <Paper />
                            ) : yourChoice === "lizard" ||
                              previousChoice === "lizard" ? (
                                <Lizard />
                            ) : yourChoice === "rock" ||
                              previousChoice === "rock" ? (
                                <Rock />
                            ) : (
                                ""
                            )}
                        </Match>
                    ) : (
                        ""
                    )}
                </AnimatePresence>
            </div>
        </FullScreenWrapper>
    );
}
