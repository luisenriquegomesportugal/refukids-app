import { useAuth } from "@/hooks/useAuth";
import { Alert } from "react-native";

export const useApi = () => {
    const { usuario } = useAuth();

    return async function <T, E extends { error: string }>(input: RequestInfo, init?: RequestInit): Promise<T> {
        let options = init || {}
        if (usuario) {
            const headers = {
                ...(options.headers || {}),
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`,
            }

            options = {
                ...options,
                headers
            }
        }

        const response = await fetch(`https://us-central1-refugio-api.cloudfunctions.net/${input}`, options);
        if (response.status < 200 || response.status >= 400) {
            const data = await response.json() as E
            Alert.alert("Falha", data.error);

            return Promise.reject(data.error)
        } else {
            return response.json() as Promise<T>
        }
    }
}