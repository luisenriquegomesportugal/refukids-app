import { styles } from "@/utils/styles";
import { ActivityIndicator, Platform, useColorScheme } from "react-native";
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

type SelectInputProps = PickerSelectProps & {
    error?: string
    loading?: boolean
}

export function SelectInput(props: SelectInputProps) {
    const colorScheme = useColorScheme()

    return <RNPickerSelect
        placeholder={{ label: "Selecione uma opção", value: undefined }}
        textInputProps={{ pointerEvents: "none" }}
        useNativeAndroidPickerStyle={false}
        darkTheme={Platform.OS === 'ios' ? true : colorScheme === "dark"}
        Icon={() => props.loading ? <ActivityIndicator style={{ padding: 12 }} /> : null}
        style={{
            inputIOS: props.error ? styles.formInputInvalid : styles.formInput,
            inputAndroid: props.error ? styles.formInputInvalid : styles.formInput,
            placeholder: props.error ? styles.formInputPlaceholderInvalid : styles.formInputPlaceholder
        }}
        {...props} />
}