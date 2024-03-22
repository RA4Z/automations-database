import { database } from "config/firebase";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";

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
