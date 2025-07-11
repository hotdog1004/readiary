export enum Step {
  BasicInfo = 'basicInfo',
  Rating = 'rating',
  Review = 'review',
  Quote = 'quote',
  Visibility = 'visibility',
}

export const stepOrder: Step[] = [
  Step.BasicInfo,
  Step.Rating,
  Step.Review,
  Step.Quote,
  Step.Visibility,
]
