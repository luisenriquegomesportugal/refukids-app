import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { User, onAuthStateChanged, signOut, signInWithEmailAndPassword, getIdTokenResult } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { UserCompleted } from "@/utils/schema";

type AuthContextType = {
    usuario: UserCompleted | null;
    carregando: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<UserCompleted | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const result = await getIdTokenResult(currentUser!)
                setUsuario({
                    ...result.claims,
                    token: result.token
                } as UserCompleted);
            } else {
                setUsuario(null);
            }
            setCarregando(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        setCarregando(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(() => setCarregando(false));
    };

    const logout = async () => {
        setCarregando(true);

        await signOut(auth)
            .then(() => setCarregando(false));
    };

    return (
        <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};