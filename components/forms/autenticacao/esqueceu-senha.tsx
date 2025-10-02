import { styles } from "@/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { z } from "zod";

const schema = z.object({
    cpf: z.string({ required_error: "O campo CPF é obrigatório" })
        .length(14, "O campo CPF está incompleto")
        .refine(cpf => cpfValidator.isValid(cpf), "O campo CPF está inválido")
})

export default function CadastroEsqueceuSenhaForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: z.infer<typeof schema>) => console.log(data)

    return <>
        <View style={styles.formControlContainer}>
            <View style={styles.formControl}>
                <Text style={errors.cpf ? styles.formLabelInvalid : styles.formLabel}>CPF *</Text>
                <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { value, onChange } }) =>
                        <MaskInput
                            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                            inputMode="numeric"
                            placeholder="Digite o cpf do responsável"
                            placeholderTextColor={errors.cpf ? styles.formInputInvalid.borderColor : styles.formInput.borderColor}
                            style={errors.cpf ? styles.formInputInvalid : styles.formInput}
                            value={value}
                            onChangeText={onChange} />} />
                {errors.cpf && <Text style={styles.formLabelHelpInvalid}>{errors.cpf.message}</Text>}
            </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonLabel}>Receber e-mail</Text>
        </TouchableOpacity>
    </>
}
