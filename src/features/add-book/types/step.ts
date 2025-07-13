export enum Step {
  BasicInfo = 'basicInfo',
  Rating = 'rating',
  Review = 'review',
  Quote = 'quote',
  Visibility = 'visibility',
}

export type StepConfig = {
  key: Step
  order: number
  title: string
  description: string
}
