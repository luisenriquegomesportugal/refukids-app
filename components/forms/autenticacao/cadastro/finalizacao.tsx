import { parentescos, parentescosOptions, sexoOptions, sexos, simNaoOptions } from "@/utils/colecoes";
import { buscarEndereco } from "@/utils/helpers";
import { styles } from "@/utils/styles";
import { escolherImagemUpload, requerirPermissao } from "@/utils/upload";
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { z } from "zod";
import { CelulaInput } from "../../Celula";
import { RedeInput } from "../../Rede";
import { SelectInput } from "../../Select";
import { useLocalSearchParams } from "expo-router";

const schema = z.object({
    cpf: z.string({ required_error: "O campo é obrigatório" })
        .length(14, "O campo está incompleto")
        .trim()
        .refine(cpf => cpfValidator.isValid(cpf), "O campo está inválido"),
    foto: z.string({ required_error: "O campo é obrigatório" }).url("O campo precisa ser uma URL Válida").trim(),
    email: z.string({ required_error: "O campo é obrigatório" }).email("O campo está inválido").trim(),
    senha: z.string({ required_error: "O campo é obrigatório" }).min(6, "O campo precisa ter mais de 6 caracteres"),
    confirmacaoSenha: z.string({ required_error: "O campo é obrigatório" }).min(6, "O campo precisa ter mais de 6 caracteres"),
})
    .superRefine((data, ctx) => {
        if (data.senha !== data.confirmacaoSenha) {
            ctx.addIssue({
                path: ['confirmacaoSenha'],
                code: z.ZodIssueCode.custom,
                message: 'As senhas não coincidem',
            });
        }
    });

export default function CadastroForm() {
    const { cpf } = useLocalSearchParams<{ cpf: string }>()

    useEffect(() => {
        requerirPermissao();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        clearErrors
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { cpf }
    })

    const uploadFotoCompleto = (imagem: string) => {
        setValue('foto', imagem);
        clearErrors('foto');
    }

    const onSubmit = (data: z.infer<typeof schema>) => console.log(data)

    const previewFoto = watch('foto', Image.resolveAssetSource(require('@/assets/images/icones/preview-profile.png')).uri)

    return <>
        <View style={styles.formControlContainer}>
            <Text style={styles.headerSection}>
                Dados pessoais
            </Text>
            <View style={styles.headerUserContainer}>
                <TouchableOpacity onPress={() => escolherImagemUpload(uploadFotoCompleto)} style={styles.headerUserEditWrapper}>
                    <Image source={{ uri: previewFoto }} style={errors.foto ? styles.headerUserInvalid : styles.headerUser} />
                    <View style={styles.headerUserEditIconOverlay}>
                        <MaterialIcons name="photo-camera" size={24} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.formControl}>
                <Text style={errors.cpf ? styles.formLabelInvalid : styles.formLabel}>CPF *</Text>
                <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { value, onChange } }) =>
                        <MaskInput
                            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                            readOnly={!!cpf}
                            keyboardType="numeric"
                            returnKeyType="done"
                            inputMode="numeric"
                            placeholder="Digite o cpf do responsável"
                            placeholderTextColor={cpf ? styles.formInputDisabled.borderColor : styles.formInput.borderColor}
                            style={cpf ? styles.formInputDisabled : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
            </View>
            <Text style={styles.headerSection}>
                Dados de acesso
            </Text>
            <View style={styles.formControl}>
                <Text style={errors.email ? styles.formLabelInvalid : styles.formLabel}>E-mail *</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => <TextInput
                        autoCapitalize={"none"}
                        autoComplete={"email"}
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="default"
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
                        keyboardType="default"
                        returnKeyType="default"
                        inputMode="text"
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
            </View>
            <View style={styles.formControl}>
                <Text style={errors.confirmacaoSenha ? styles.formLabelInvalid : styles.formLabel}>Confirmação de senha *</Text>
                <Controller
                    control={control}
                    name="confirmacaoSenha"
                    render={({ field: { onChange, onBlur, value } }) => <TextInput
                        keyboardType="default"
                        returnKeyType="default"
                        inputMode="text"
                        placeholder="Confirme sua senha"
                        placeholderTextColor={errors.confirmacaoSenha ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                        secureTextEntry={true}
                        style={[styles.formInput, errors.confirmacaoSenha ? styles.formInputInvalid : null]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />}
                />
                {
                    errors.confirmacaoSenha
                        ? <Text style={styles.formLabelHelpInvalid}>{errors.confirmacaoSenha.message}</Text>
                        : null
                }
            </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonLabel}>{cpf ? "Finalizar" : "Cadastrar"}</Text>
        </TouchableOpacity>
    </>
}
