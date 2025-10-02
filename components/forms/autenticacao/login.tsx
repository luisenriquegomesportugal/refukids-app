import { auth } from "@/configs/firebase";
import { styles } from "@/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const schema = z
    .object({
        email: z.string({ required_error: "O campo é obrigatório" }).email("O campo precisa ser um E-mail").trim(),
        senha: z.string({ required_error: "O campo é obrigatório" }).min(6, "O campo precisa ter mais de 6 caracteres"),
    })

export default function LoginForm() {
    const [carregando, setCarregando] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setCarregando(true);

        signInWithEmailAndPassword(auth, data.email, data.senha)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-credential": return Alert.alert("Falha", "E-mail e/ou senha estão incorretos")
                    case "auth/user-not-found": return Alert.alert("Falha", "Usuário não encontrado")
                    default: return Alert.alert("Falha", "Falha ao realizar o login")
                }
            })
            .finally(() => setCarregando(false));
    };

    return <>
        <View style={styles.formControlContainer}>
            <View style={styles.formControl}>
                <Text style={errors.email ? styles.formLabelInvalid : styles.formLabel}>E-mail *</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => <TextInput
                        autoCapitalize={"none"}
                        inputMode="email"
                        placeholder="Digite seu E-mail"
                        placeholderTextColor={errors.email ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                        style={[styles.formInput, errors.email ? styles.formInputInvalid : null]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />}
                />
                {
                    errors.email
                        ? <Text style={styles.formLabelHelpInvalid}>{errors.email.message}</Text>
                        : null
                }
            </View>
            <View style={styles.formControl}>
                <Text style={errors.senha ? styles.formLabelInvalid : styles.formLabel}>Senha *</Text>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, onBlur, value } }) => <TextInput
                        placeholder="Digite sua Senha"
                        placeholderTextColor={errors.senha ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                        secureTextEntry={true}
                        style={[styles.formInput, errors.senha ? styles.formInputInvalid : null]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />}
                />
                {
                    errors.senha
                        ? <Text style={styles.formLabelHelpInvalid}>{errors.senha.message}</Text>
                        : null
                }
                <TouchableOpacity
                    style={[styles.cancelButton, { alignItems: "flex-end" }]}
                    onPress={() => router.navigate("/esqueceu-senha")}>
                    <Text style={styles.cancelButtonLabel}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ gap: 8 }}>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit)}>
                {
                    carregando
                        ? <ActivityIndicator />
                        : <Text style={styles.submitButtonLabel}>Acessar</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.navigate("/cadastro/verificacao")}>
                <Text style={styles.cancelButtonLabel}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    </>
}
