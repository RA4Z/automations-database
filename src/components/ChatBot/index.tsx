import styles from './ChatBot.module.scss'
import Send from '@mui/icons-material/Send';
import Cancelar from '@mui/icons-material/Close';
import { Dialog, TextField } from '@mui/material';
import { useState } from "react";
import { runChat } from './chat'

interface Props {
    visible: any,
    setVisible: any
    data?: any
}

interface historico {
    text: string,
    type: string
}

export default function ChatBot({ visible, setVisible }: Props) {
    const [history, setHistory] = useState<historico[]>([])
    const [question, setQuestion] = useState('')

    async function sendMessage() {
        const updatedHistory = [...history]
        updatedHistory.push({ text: question, type: 'question' })
        setHistory(updatedHistory)

        const pergunta = question
        setQuestion('')

        let attempts = 3;
        let response = ''

        while (attempts > 0) {
            try {
                response = await runChat(pergunta);
                break;
            } catch (error: any) {
                if (attempts > 1) {
                    response = error;
                    attempts--;
                }
            }
        }
        const updatedAnswer = [...updatedHistory];
        updatedAnswer.push({ text: response, type: 'answer' });
        setHistory(updatedAnswer);
    }
    return (
        <>
            <Dialog open={true} style={{ zIndex: '100' }} onClose={() => setVisible(false)}>
                <div className={styles.container}>
                    {visible && <div className={styles.container}>
                        <div className={styles.container__header}>
                            <li>ChatBot PCP</li>
                            <Cancelar fontSize='large' onClick={() => setVisible(false)} className={styles.container__header__close} />
                        </div>
                        <div id='texto_chat' className={styles.container__chat}>
                            {history.map((message, index) => (
                                <div key={index} className={message.type === 'question' ? styles.enviada : styles.recebida}>
                                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.sendMessage}>
                            <TextField
                                id="text-chat"
                                label="Escrever Comando"
                                type='text'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                multiline
                                maxRows={4}
                                className={styles.input}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                            />

                            <Send
                                fontSize='large'
                                className={styles.send}
                                onClick={() => {
                                    if (question.trim() !== '') {
                                        sendMessage();
                                    }
                                }}
                            />
                        </div>
                    </div>}
                </div>
            </Dialog>
        </>
    )
}