import { QuestionAnswerDto } from '@/dtos/QuestionAnswer.dto';
import { Collapse } from 'antd/es';

type Props = {
  questions: QuestionAnswerDto[];
};
export default function ProductQuestionAnswer({ questions }: Props) {
  return (
    <div
      className={'rounded-[10px] border-gray-500 bg-white shadow-custom mt-3'}
    >
      <div
        className={
          'bg-gray-100 text-primary font-semibold p-3 text-[16px] text-center'
        }
      >
        <h3 className={'uppercase'}>Câu hỏi thường gặp</h3>
      </div>
      <div className={'p-3'}>
        <Collapse defaultActiveKey={['1']}>
          {questions.map((item, index) => {
            return (
              <Collapse.Panel
                header={item.question}
                key={index.toString()}
                className={'border-b border-gray-500'}
              >
                <p>{item.answer}</p>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
