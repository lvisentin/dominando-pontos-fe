export interface Category {
  id: number;
  name: string;
  key: string;
  liveloName: string;
  esferaName: string;
  createdAt: string;
  updatedAt: string;
  userSavedCategories: Category[];
  isSaved: boolean;
}
