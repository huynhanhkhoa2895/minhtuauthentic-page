import { NextSeo } from 'next-seo';
import { SettingsDto } from '@/dtos/Settings.dto';
import { SETTING_KEY } from '@/config/enum';
import { SEOProps } from '@/config/type';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type Props = {
  settings: SettingsDto[];
  seo?: SEOProps;
};
export default function DefaultSeo({ settings, seo }: Props) {
  const router = useRouter();
  const setting = (settings || []).find(
    (item) => item.key === SETTING_KEY.GENERAL.PAGE_INFORMATION.KEY,
  );

  return (
    <NextSeo
      title={seo?.title || setting?.value?.page_title || 'Minh tu Authentic'}
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
        title: seo?.title || setting?.value?.page_title || 'Minh tu Authentic',
        description:
          seo?.description ||
          setting?.value?.page_description ||
          'Minh tu Authentic',
        images: [
          {
            url:
              seo?.image ||
              'https://demo.mikiperfume.com/_next/static/media/logo.fc400164.png',
            width: seo?.width || 253,
            height: seo?.height || 83,
            alt: 'Minh tu Authentic',
          },
        ],
        url: 'https://demo.mikiperfume.com',
      }}
      canonical={seo?.canonical || router?.asPath.split('?')[0]}
    />
  );
}
