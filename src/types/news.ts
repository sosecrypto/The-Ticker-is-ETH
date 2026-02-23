export interface NewsItem {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  summary: string;
  content: string;
  author: string;
}

export interface NewsFeedData {
  feedTitle: string;
  feedSubtitle: string;
  fetchedAt: string;
  items: NewsItem[];
}
