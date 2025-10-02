import { styles } from "@/utils/styles";
import { useState } from "react";
import { Switch, SwitchProps, Text, View } from "react-native";

export function SwitchInput(props: SwitchProps) {
    const [isEnabled, setIsEnabled] = useState(false);
    const { onValueChange, ...defaultProps } = props;

    const onSwitchValueChange = (value: boolean) => {
        setIsEnabled(value);

        if (onValueChange) {
            onValueChange(value)
        }
    }

    return <View style={styles.formInputConfigWrapper}>
        <Text style={styles.formInputConfigValue}>{isEnabled ? 'Ativado' : 'Desativado'}</Text>
        <Switch
            {...defaultProps}
            onValueChange={onSwitchValueChange}
            value={isEnabled}
            ios_backgroundColor={"#000000"}
            style={{
                transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                padding: 0
            }}
        />
    </View>
}