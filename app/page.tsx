import HomeClient from '@/components/HomeClient';
import { NewsItem } from '@/components/NewsCard';

type ApiResponse = {
  message: string;
  total: number;
  data: NewsItem[];
};

async function getNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://berita-indo-api.vercel.app/v1/cnn-news/', {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const data: ApiResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export default async function Home() {
  const news = await getNews();

  return <HomeClient news={news} />;
}
