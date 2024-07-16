import { useEffect, useRef, useState } from 'react';
type Props = {
  end_date: Date;
};
export default function Countdown({ end_date }: Props) {
  const refInterval = useRef<NodeJS.Timeout>();
  const [countdown, setCountdown] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    day: string;
  }>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    day: '00',
  });
  useEffect(() => {
    startTimer();
    return () => {
      refInterval.current && clearInterval(refInterval.current);
    };
  }, []);

  function startTimer() {
    if (refInterval.current) {
      clearInterval(refInterval.current);
    }
    let date = new Date();
    let endDate: Date | number = new Date(end_date);
    if (date.getHours() >= 17) {
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate = endDate.getTime();
    let diff, hours, minutes, seconds, day;

    function timer() {
      diff = (((endDate as number) - Date.now()) / 1000) | 0;

      // Setting and displaying hours, minutes, seconds
      day = (diff / 3600 / 24) | 0;
      hours = (diff / 3600) % 24 | 0;
      minutes = ((diff % 3600) / 60) | 0;
      seconds = diff % 60 | 0;

      day = day < 10 ? '0' + day : day.toString();
      hours = hours < 10 ? '0' + hours : hours.toString();
      minutes = minutes < 10 ? '0' + minutes : minutes.toString();
      seconds = seconds < 10 ? '0' + seconds : seconds.toString();

      setCountdown({
        day,
        hours,
        minutes,
        seconds,
      });
    }
    timer();
    refInterval.current = setInterval(timer, 1000);
  }
  return (
    <div className={'flex gap-3'}>
      <span className={'bg-white p-3 rounded-[10px]'}>{countdown.day}</span>
      <span className={'bg-white p-3 rounded-[10px]'}>{countdown.hours}</span>
      <span className={'bg-white p-3 rounded-[10px]'}>{countdown.minutes}</span>
      <span className={'bg-white p-3 rounded-[10px]'}>{countdown.seconds}</span>
    </div>
  );
}
