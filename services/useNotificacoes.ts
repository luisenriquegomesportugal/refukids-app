import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export default function useNotificacoes() {
  const fetcher = useApi()

  const { data, isLoading, refetch, isRefetching } = useQuery<string[]>({
    queryKey: ['notificacoesGet'],
    queryFn: () => fetcher('notificacoesGet')
  })

  const putNotificacoes = async () => {
    await fetcher('notificacoesPut', { method: 'PUT' }) 
  }

  return {
    notificacoes: data,
    carregandoNotificacoes: isLoading,
    recarregarNotificacoes: refetch,
    recarregandoNotificacoes: isRefetching,
    limparNotificacoes: putNotificacoes
  }
}