import { NextSeo } from 'next-seo';
import { SettingsDto } from '@/dtos/Settings.dto';
import { SETTING_KEY } from '@/config/enum';
type Props = {
  settings: SettingsDto[];
  canonical?: string;
};
export default function DefaultSeo({ settings, canonical }: Props) {
  const setting = settings.find(
    (item) => item.key === SETTING_KEY.GENERAL.PAGE_INFORMATION.KEY,
  );
  return (
    <NextSeo
      title={setting?.value?.page_title || 'Minh tu Authentic'}
      description={setting?.value?.page_description || 'Minh tu Authentic'}
      additionalMetaTags={[
        {
          property: 'keywords',
          content:
            setting?.value?.page_keyword ||
            'Shop nước hoa chính hãng Tphcm, Authentic, auth, Tân phú, trả góp',
        },
      ]}
      openGraph={{
        title: setting?.value?.page_title || 'Minh tu Authentic',
        description: setting?.value?.page_description || 'Minh tu Authentic',
        images: [
          {
            url: 'https://demo.mikiperfume.com/_next/static/media/logo.fc400164.png',
            width: 253,
            height: 83,
            alt: 'Minh tu Authentic',
          },
        ],
        url: 'https://demo.mikiperfume.com',
      }}
      canonical={canonical}
    />
  );
}
