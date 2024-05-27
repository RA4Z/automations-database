import { database } from "config/firebase";
import { child, limitToLast, onValue, orderByChild, push, query, ref, remove, serverTimestamp, set } from "firebase/database";

export async function sendMessage(message: string) {
    const id = push(child(ref(database), 'chatbot')).key
    set(ref(database, `chatbot/${id}`), {
        mensagem: message, timestamp: serverTimestamp()
    })
}

export async function getHistory(dbRef: string, setHistory: any) {
    try {
        const messagesRef = ref(database, dbRef);
        const limitedMessagesQuery = query(messagesRef, orderByChild('horaExec'), limitToLast(10)); // Limitando para buscar apenas as últimas 10 execuções

        onValue(limitedMessagesQuery, (snapshot) => {
            const messagesData: any[] = [];
            snapshot.forEach((childSnapshot) => {
                messagesData.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setHistory(messagesData.reverse());
        });
    } catch (error) {
        console.error('Erro ao buscar o histórico:', error);
    }
}

export async function deleteHistory(automationName:string, userName:string, historyId: string) {
    const chatRef = ref(database, `Algoritmos/${automationName}/${userName}/${historyId}`);
    const result = await remove(chatRef)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        });
    if (result) {
        return true
    } else {
        return false
    }
}
