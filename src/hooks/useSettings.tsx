import useSWR from 'swr';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingsDto } from '@/dtos/Settings.dto';
import { useEffect, useState } from 'react';
const fetcher = () =>
  fetch(`/api/settings`, {
    method: 'GET',
  }).then((res) => res.json());
export default function useSettings() {
  const { data, error, isLoading, isValidating } = useSWR(
    'useSetting',
    fetcher,
  );
  const [_data, setData] = useState<{
    menu: ResponseMenuDto | undefined;
    footerContent: ResponseFooterDto | undefined;
    settings: SettingsDto[];
  }>({
    menu: undefined,
    footerContent: undefined,
    settings: [],
  });
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return _data;
}
