import { Familia } from "@/utils/schema";
import { useQuery } from "@tanstack/react-query";

export default function useFamilia() {
  const { data, isLoading, refetch, isRefetching } = useQuery<Familia>({
    queryKey: ['familiasGet'],
    queryFn: () => fetch('familiasGet').then(res => res.json())
  })

  return {
    familia: data,
    criancas: Object.values(data?.criancas || {}),
    responsaveis: Object.values(data?.responsaveis || {}),
    tios: Object.values(data?.tios || {}),
    carregandoFamilia: isLoading,
    recarregarFamilia: refetch,
    recarregandoFamilia: isRefetching
  }
}