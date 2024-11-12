import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../services/apiSettings'

export function useSettings() {
    const {
        data: settings,
        isLoading: loadingSettings,
        error: errorSettings,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    })

    return { settings, loadingSettings, errorSettings }
}
