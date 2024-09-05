import { twMerge } from 'tailwind-merge';
import {
  BLOCK_UNDER_CATEGORY_POSITION,
  STATIC_COMPONENT_TYPE,
} from '@/config/enum';
import Link from 'next/link';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
const fetcher = () =>
  fetch('/api/static-contents/' + STATIC_COMPONENT_TYPE.SOCIALS, {
    method: 'GET',
  }).then((res) => res.json());
export default function Socials() {
  const { data, error } = useSWR(
    '/api/static-contents/' + STATIC_COMPONENT_TYPE.SOCIALS,
    fetcher,
  );
  const [display, setDisplay] = useState<StaticContentsDto[][]>([]);

  useEffect(() => {
    if (data) {
      const socials = data?.data as StaticContentsDto[];
      const left = (socials || []).filter(
        (social) =>
          social.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.LEFT,
      );
      const right = (socials || []).filter(
        (social) =>
          social.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.RIGHT,
      );
      setDisplay([left, right]);
    }
  }, [data]);

  return (
    <>
      {display.map((socials, index) => {
        return (
          <div
            key={index + 'socials-position'}
            className={twMerge(
              'fixed bottom-20 z-50 transition-all duration-500  flex flex-col gap-3',
              index === 0 ? 'left-3' : 'right-3',
            )}
          >
            {socials.map((social, index2) => {
              return (
                <div
                  className={twMerge(
                    'flex items-center group',
                    index === 0
                      ? 'flex-row-reverse justify-end'
                      : 'flex-row justify-end',
                  )}
                  key={index2 + '-social'}
                >
                  <Link
                    href={social?.properties?.slug || '/'}
                    className={twMerge(
                      'py-2 bg-primary text-white rounded-full  relative transition-all duration-300 visible opacity-0 group-hover:visible group-hover:opacity-100',
                      index === 0
                        ? 'pl-[25px] pr-3  -translate-x-5 group-hover:-translate-x-6'
                        : 'pr-[25px] pl-3  translate-x-5 group-hover:translate-x-6',
                    )}
                  >
                    {social?.title || 'Follow us'}
                  </Link>
                  <div className={'z-[2] '}>
                    <ImageWithFallback
                      className={
                        'w-[60px] h-[60px] object-contain rounded-full'
                      }
                      image={social?.images?.[0]?.image}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
