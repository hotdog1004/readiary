import { Step, StepConfig } from '../types'

export const stepOrder: Step[] = [
  Step.BasicInfo,
  Step.Rating,
  Step.Review,
  Step.Quote,
  Step.Visibility,
]

export const stepConfigs: Record<Step, StepConfig> = {
  [Step.BasicInfo]: {
    title: '기본 정보',
    description: '책의 기본적인 정보를 입력해주세요.',
  },
  [Step.Rating]: {
    title: '평점',
    description: '이 책에 대한 평점을 매겨주세요.',
  },
  [Step.Review]: {
    title: '리뷰',
    description: '책에 대한 리뷰를 작성해주세요.',
  },
  [Step.Quote]: {
    title: '인상 깊은 구절',
    description: '인상 깊었던 구절을 기록해주세요.',
  },
  [Step.Visibility]: {
    title: '공개 설정',
    description: '리뷰의 공개 여부를 설정해주세요.',
  },
}
