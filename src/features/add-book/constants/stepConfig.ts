import { Step } from '../types'

export interface StepConfig {
  key: Step
  label: string
  description: string
}

export const stepConfigs: Record<Step, StepConfig> = {
  [Step.BasicInfo]: {
    key: Step.BasicInfo,
    label: '기본 정보',
    description: '책의 기본적인 정보를 입력해주세요.',
  },
  [Step.Rating]: {
    key: Step.Rating,
    label: '평점',
    description: '이 책에 대한 평점을 매겨주세요.',
  },
  [Step.Review]: {
    key: Step.Review,
    label: '리뷰',
    description: '책에 대한 리뷰를 작성해주세요.',
  },
  [Step.Quote]: {
    key: Step.Quote,
    label: '인상 깊은 구절',
    description: '인상 깊었던 구절을 기록해주세요.',
  },
  [Step.Visibility]: {
    key: Step.Visibility,
    label: '공개 설정',
    description: '리뷰의 공개 여부를 설정해주세요.',
  },
}
