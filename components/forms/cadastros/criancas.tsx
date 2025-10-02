import { sexoOptions, sexos, simNaoOptions } from "@/utils/colecoes";
import { DateValidator } from "@/utils/helpers";
import { styles } from "@/utils/styles";
import { escolherImagemUpload, requerirPermissao } from "@/utils/upload";
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Image, Platform, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import MaskInput from "react-native-mask-input";
import RNPickerSelect from 'react-native-picker-select';
import { z } from "zod";
import { CelulaInput } from "../Celula";
import { RedeInput } from "../Rede";
import { SelectInput } from "../Select";
import { useApi } from "@/hooks/useApi";

const schema = z
    .object({
        foto: z.string({ required_error: "O campo é obrigatório" }).url("O campo precisa ser uma URL Válida").trim(),
        nome: z.string({ required_error: "O campo é obrigatório" }).min(10, "O campo precisa ser completo").trim(),
        sexo: z.enum(sexos, { required_error: "O campo é obrigatório", invalid_type_error: 'O campo é obrigatório' }),
        dataNascimento: z.string({ required_error: "O campo é obrigatório" }).refine(date => DateValidator.test(date.split('/').reverse().join('-')), 'O campo está inválido'),
        observacao: z.string().trim().optional(),
        participaDeCelula: z.boolean({ required_error: 'O campo é obrigatório' }),
        rede: z.string().optional(),
        celula: z.string().optional()
    })

export default function CadastroCriancaForm() {
    const [subindoFoto, setSubindoFoto] = useState(false)
    const [salvando, setSalvando] = useState(false)
    const mutate = useApi()

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        clearErrors
    } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        requerirPermissao();
    }, []);

    const uploadFoto = async () => {
        setSubindoFoto(true)

        escolherImagemUpload()
            .then(async image => mutate<{ downloadUrl: string }, { error: string }>('arquivosPost', {
                method: "POST",
                body: JSON.stringify({
                    arquivo: image.fileName,
                    formato: image.mimeType,
                    conteudo: image.base64,
                })
            }))
            .then(({downloadUrl}) => {
                setValue('foto', downloadUrl);
                clearErrors('foto');
            })
            .finally(() => setSubindoFoto(false))
    }

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setSalvando(true);

        await mutate('criancasPost', {
            body: JSON.stringify(data)
        })

        setSalvando(false)
    }

    const previewFoto = watch('foto', Image.resolveAssetSource(require('@/assets/images/icones/preview-profile.png')).uri)

    return <>
        <View style={styles.formControlContainer}>
            <View style={styles.headerUserContainer}>
                <TouchableOpacity onPress={uploadFoto} style={styles.headerUserEditWrapper}>
                    <Image source={{ uri: previewFoto }} style={errors.foto ? styles.headerUserInvalid : styles.headerUser} />
                    <View style={styles.headerUserEditIconOverlay}>
                        {
                            subindoFoto
                            ? <ActivityIndicator />
                            : <MaterialIcons name="photo-camera" size={24} color="#fff" />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.formControl}>
                <Text style={errors.nome ? styles.formLabelInvalid : styles.formLabel}>Nome *</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            inputMode="text"
                            placeholder="Digite o nome completo"
                            placeholderTextColor={errors.nome ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.nome ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.nome && <Text style={styles.formLabelHelpInvalid}>{errors.nome.message}</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.dataNascimento ? styles.formLabelInvalid : styles.formLabel}>Data de nascimento *</Text>
                <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { value, onChange } }) => <MaskInput
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        placeholder="Digite a data de nascimento"
                        placeholderTextColor={errors.dataNascimento ? styles.formInputPlaceholderInvalid.color : styles.formInputPlaceholder.color}
                        inputMode="numeric"
                        style={styles.formInput}
                        value={value}
                        onChangeText={text => onChange(text)} />} />
                {errors.dataNascimento && <Text style={styles.formLabelHelpInvalid}>{errors.dataNascimento.message}</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.sexo ? styles.formLabelInvalid : styles.formLabel}>Sexo *</Text>
                <Controller
                    control={control}
                    name="sexo"
                    render={({ field: { value, onChange } }) =>
                        <SelectInput
                            error={errors.sexo?.message}
                            value={value}
                            onValueChange={onChange}
                            items={sexoOptions} />} />
                {errors.sexo && <Text style={styles.formLabelHelpInvalid}>{errors.sexo.message}</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.observacao ? styles.formLabelInvalid : styles.formLabel}>Observação</Text>
                <Controller
                    control={control}
                    name="observacao"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            multiline={true}
                            autoCorrect={true}
                            inputMode="text"
                            placeholder="Digite as observações importantes"
                            placeholderTextColor={errors.observacao ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.observacao ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.observacao && <Text style={styles.formLabelHelpInvalid}>{errors.observacao.message}</Text>}
            </View>
            <Text style={styles.headerSection}>
                Dados de rede/célula
            </Text>
            <View style={styles.formControl}>
                <Text style={errors.participaDeCelula ? styles.formLabelInvalid : styles.formLabel}>Participa de uma célula?</Text>
                <View style={styles.formControl}>
                    <Controller
                        control={control}
                        name="participaDeCelula"
                        render={({ field: { value, onChange } }) =>
                            <SelectInput
                                error={errors.participaDeCelula?.message}
                                value={value}
                                onValueChange={onChange}
                                items={simNaoOptions} />} />
                </View>
                {errors.participaDeCelula && <Text style={styles.formLabelHelpInvalid}>{errors.participaDeCelula.message}</Text>}
            </View>
            {
                watch('participaDeCelula')
                    ? <>
                        <View style={styles.formControl}>
                            <Text style={errors.rede ? styles.formLabelInvalid : styles.formLabel}>Rede *</Text>
                            <Controller
                                control={control}
                                name="rede"
                                render={({ field: { value, onChange } }) =>
                                    <RedeInput
                                        value={value}
                                        error={errors.rede?.message}
                                        onValueChange={onChange} />} />
                            {errors.rede && <Text style={styles.formLabelHelpInvalid}>{errors.rede.message}</Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={errors.celula ? styles.formLabelInvalid : styles.formLabel}>Célula *</Text>
                            <Controller
                                control={control}
                                name="celula"
                                render={({ field: { value, onChange } }) =>
                                    <CelulaInput
                                        redeId={watch('rede')}
                                        value={value}
                                        error={errors.celula?.message}
                                        onValueChange={onChange} />} />
                            {errors.celula && <Text style={styles.formLabelHelpInvalid}>{errors.celula.message}</Text>}
                        </View>
                    </>
                    : null
            }
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)} disabled={salvando}>
            {
                salvando
                ? <ActivityIndicator />
                : <Text style={styles.submitButtonLabel}>Cadastrar</Text>
            }
        </TouchableOpacity>
    </>
}
