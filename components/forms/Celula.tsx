import { CelulasModel } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Item, PickerSelectProps } from 'react-native-picker-select';
import { SelectInput } from "./Select";

type CelulaProps = Omit<PickerSelectProps, "items"> & {
    redeId?: string,
    error?: string
}

export function CelulaInput(props: CelulaProps) {
    const { error, redeId } = props

    const { isPending, error: loadingError, data } = useQuery<{ celulas: CelulasModel[] }>({
        queryKey: ['celulas'],
        queryFn: () =>
            fetch('https://admin.arefugio.com.br/api/celulas')
                .then((res) => res.json()),
    })

    const celulas = data?.celulas
        .filter(celula => redeId ? celula.rede === `Rede ${redeId}` : true)
        .map<Item>(celula => ({ value: celula.id.toString(), label: `${celula.celula} (${celula.lider})` }))
        .sort((a, b) => a.value.localeCompare(b.value, 'pt-BR', { usage: "sort", numeric: true }))

    return <SelectInput
        error={error}
        loading={isPending}
        items={celulas || []}
        {...props} />
}