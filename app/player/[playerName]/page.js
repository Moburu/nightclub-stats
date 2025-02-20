'use client'

import { useParams } from "next/navigation"
import styles from "../../page.module.css"

export default function Player() {
    const { playerName } = useParams();

    return <h1 className={styles.header}>{playerName}</h1>
}
