"use client";

import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "@/styles/main.module.scss";

export default function FullScreenWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const matches = useMediaQuery("(max-width:600px)");
    const handle = useFullScreenHandle();

    if (matches)
        return (
            <FullScreen handle={handle} className={styles.fatherComponent}>
                {!handle.active ? (
                    <div className={styles.permission}>
                        <h1>
                            To play this game your need to be in full screen
                        </h1>
                        <button onClick={handle.enter}>
                            Enter Full screen
                        </button>
                    </div>
                ) : (
                    children
                )}
            </FullScreen>
        );
    else return <div className={styles.fatherComponent}>{children}</div>;
}
