import { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function useGoogleToken(key: string) {
  const [_token, setToken] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha(key);
    setToken(token);
  }, [executeRecaptcha]);
  useEffect(() => {
    handleReCaptchaVerify().catch();
  }, [handleReCaptchaVerify]);
  return { token: _token };
}
