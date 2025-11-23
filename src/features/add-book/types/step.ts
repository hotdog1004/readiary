export enum Step {
  BasicInfo = 'basicInfo',
  Rating = 'rating',
  Review = 'review',
  Quote = 'quote',
  Visibility = 'visibility',
}

export type StepConfig = {
  title: string
  description: string
}
