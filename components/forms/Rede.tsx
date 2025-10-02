import { CelulasModel } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { PickerSelectProps } from 'react-native-picker-select';
import { SelectInput } from "./Select";

type CelulaProps = Omit<PickerSelectProps, "items"> & {
    error?: string
}

export function RedeInput(props: CelulaProps) {
    const { error } = props

    const { isPending, error: loadingError, data } = useQuery<{ celulas: CelulasModel[] }>({
        queryKey: ['celulas'],
        queryFn: () =>
            fetch('https://admin.arefugio.com.br/api/celulas')
                .then((res) => res.json())
    })

    const redes = data?.celulas
        .map(celula => ({ value: celula.rede.replaceAll(/[^\d]+/g, ''), label: celula.rede }))
        .filter((rede, index, self) => index === self.findIndex((o) => o.value === rede.value))
        .sort((a, b) => a.value.localeCompare(b.value, 'pt-BR', { usage: "sort", numeric: true }))

    return <SelectInput
        items={redes || []}
        loading={isPending}
        error={error}
        {...props} />
}