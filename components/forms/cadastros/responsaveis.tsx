import MaskInput from "react-native-mask-input";
import { parentescos, parentescosOptions, sexoOptions, sexos, simNaoOptions } from "@/utils/colecoes";
import { styles } from "@/utils/styles";
import { escolherImagemUpload, requerirPermissao } from "@/utils/upload";
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { SelectInput } from "../Select";
import { RedeInput } from "../Rede";
import { CelulaInput } from "../Celula";
import { buscarEndereco } from "@/utils/helpers";

const schema = z
    .object({
        cpf: z.string({ required_error: "O campo é obrigatório" })
            .length(14, "O campo está incompleto")
            .trim()
            .refine(cpf => cpfValidator.isValid(cpf), "O campo está inválido"),
        nome: z.string({ required_error: "O campo é obrigatório" }).min(10, "O campo precisa ser completo").trim(),
        foto: z.string({ required_error: "O campo é obrigatório" }).url("O campo precisa ser uma URL Válida").trim(),
        sexo: z.enum(sexos, { required_error: "O campo é obrigatório", invalid_type_error: 'O campo é obrigatório' }),
        telefone: z.string({ required_error: "O campo é obrigatório" }).trim(),
        parentesco: z.enum(parentescos, { required_error: "O campo é obrigatório", invalid_type_error: 'O campo é obrigatório' }),
        endereco: z.string({ required_error: "O campo é obrigatório" }).trim(),
        numero: z.string({ required_error: "O campo é obrigatório" }).trim(),
        complemento: z.string().trim().optional(),
        bairro: z.string({ required_error: "O campo é obrigatório" }).trim(),
        cidade: z.string({ required_error: "O campo é obrigatório" }).trim(),
        cep: z.string({ required_error: "O campo é obrigatório" })
            .trim()
            .length(9, "O campo está incompleto"),
        participaDeCelula: z.boolean({ required_error: 'O campo é obrigatório' }),
        rede: z.string().optional(),
        celula: z.string().optional()
    });

export default function CadastroResponsaveisForm() {
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
                            keyboardType="numeric"
                            returnKeyType="done"
                            inputMode="numeric"
                            placeholder="Digite o cpf do responsável"
                            placeholderTextColor={styles.formInput.borderColor}
                            style={styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
            </View>
            <View style={styles.formControl}>
                <Text style={errors.nome ? styles.formLabelInvalid : styles.formLabel}>Nome *</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            autoComplete="name"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="default"
                            inputMode="text"
                            placeholder="Digite o nome do responsável"
                            placeholderTextColor={errors.nome ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.nome ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.nome && <Text style={styles.formLabelHelpInvalid}>{errors.nome.message}</Text>}
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
                <Text style={errors.telefone ? styles.formLabelInvalid : styles.formLabel}>Telefone *</Text>
                <Controller
                    control={control}
                    name="telefone"
                    render={({ field: { value, onChange } }) =>
                        <MaskInput
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="Digite o telefone"
                            placeholderTextColor={errors.telefone ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            autoCorrect={false}
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            inputMode="numeric"
                            style={errors.telefone ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.telefone && <Text style={styles.formLabelHelpInvalid}>{errors.telefone.message}</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.parentesco ? styles.formLabelInvalid : styles.formLabel}>Parentesco *</Text>
                <Controller
                    control={control}
                    name="parentesco"
                    render={({ field: { value, onChange } }) =>
                        <SelectInput
                            error={errors.parentesco?.message}
                            value={value}
                            onValueChange={onChange}
                            items={parentescosOptions} />} />
                {errors.parentesco && <Text style={styles.formLabelHelpInvalid}>{errors.parentesco.message}</Text>}
            </View>
            <Text style={styles.headerSection}>
                Dados de endereço
            </Text>
            <View style={styles.formControl}>
                <Text style={errors.cep ? styles.formLabelInvalid : styles.formLabel}>CEP *</Text>
                <Controller
                    control={control}
                    name="cep"
                    render={({ field: { value, onChange } }) =>
                        <MaskInput
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            placeholder="Digite o CEP"
                            placeholderTextColor={errors.cep ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            autoCorrect={false}
                            keyboardType="numeric"
                            returnKeyType="done"
                            inputMode="numeric"
                            style={errors.cep ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onBlur={() => buscarEndereco(value, setValue, clearErrors)}
                            onChangeText={onChange} />} />
                {errors.cep && <Text style={styles.formLabelHelpInvalid}>Campo obrigatório</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.endereco ? styles.formLabelInvalid : styles.formLabel}>Endereço *</Text>
                <Controller
                    control={control}
                    name="endereco"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            autoComplete="street-address"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="done"
                            inputMode="text"
                            placeholder="Digite o endereço"
                            placeholderTextColor={errors.endereco ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.endereco ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.endereco && <Text style={styles.formLabelHelpInvalid}>Campo obrigatório</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.numero ? styles.formLabelInvalid : styles.formLabel}>Número *</Text>
                <Controller
                    control={control}
                    name="numero"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="done"
                            inputMode="text"
                            placeholder="Digite o número"
                            placeholderTextColor={errors.numero ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.numero ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.numero && <Text style={styles.formLabelHelpInvalid}>Campo obrigatório</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.complemento ? styles.formLabelInvalid : styles.formLabel}>Complemento</Text>
                <Controller
                    control={control}
                    name="complemento"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="done"
                            inputMode="text"
                            placeholder="Digite o complemento"
                            placeholderTextColor={errors.complemento ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.complemento ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
            </View>
            <View style={styles.formControl}>
                <Text style={errors.bairro ? styles.formLabelInvalid : styles.formLabel}>Bairro *</Text>
                <Controller
                    control={control}
                    name="bairro"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="done"
                            inputMode="text"
                            placeholder="Digite o bairro"
                            placeholderTextColor={errors.bairro ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.bairro ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.bairro && <Text style={styles.formLabelHelpInvalid}>Campo obrigatório</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={errors.cidade ? styles.formLabelInvalid : styles.formLabel}>Cidade *</Text>
                <Controller
                    control={control}
                    name="cidade"
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={true}
                            keyboardType="default"
                            returnKeyType="done"
                            inputMode="text"
                            placeholder="Digite a cidade"
                            placeholderTextColor={errors.cidade ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.cidade ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.cidade && <Text style={styles.formLabelHelpInvalid}>Campo obrigatório</Text>}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonLabel}>Cadastrar</Text>
        </TouchableOpacity>
    </>
}
