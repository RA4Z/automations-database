import Header from "components/Header"
import styles from './Homepage.module.scss'
import Footer from "components/Footer"

import { viewAutomations } from "services/firestore"
import { AutomationType } from "types/automation"

import { useEffect, useState } from "react"
import { Button, Divider, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ExecCard from "components/ExecCard"

export default function Homepage() {
    const navigate = useNavigate()
    const [automations, setAutomations] = useState<AutomationType[]>([])
    const [backup, setBackup] = useState<AutomationType[]>([])
    const [filter, setFilter] = useState({ filename: '' })

    useEffect(() => {
        async function getFirebaseData() {
            await viewAutomations(setAutomations, setBackup)
        }
        getFirebaseData()
    }, [])

    useEffect(() => {
        function findFilename(filename: string) {
            const regex = new RegExp(filter.filename, 'i');
            return regex.test(filename);
        }
        let newList = backup.filter(item => findFilename(item.nome) || findFilename(item.descricao))
        setAutomations(newList)
    }, [filter, backup])

    return (
        <>
            <Header />

            <div className={styles.header}>
                <TextField
                    value={filter.filename}
                    onChange={e => setFilter({ ...filter, filename: e.target.value })}
                    label="Descrição da Automação"
                    variant="filled"
                    style={{ backgroundColor: 'white' }}
                />
                <Button onClick={() => navigate(`/Agenda`)} variant="outlined" size="medium">
                    Visualizar Agenda
                </Button>
            </div>
            <Divider style={{ background: 'white' }} />
            <div className={styles.container}>
                <div className={styles.projects}>
                    {automations.map((automation, index) => (
                        <ExecCard
                            key={index}
                            id={automation.id}
                            descricao={automation.descricao}
                            imagem={automation.imagem}
                            data_desenvolvimento={automation.data_desenvolvimento}
                            nome={automation.nome}
                            desenvolvedor={automation.desenvolvedor}
                            solicitante={automation.solicitante}

                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}