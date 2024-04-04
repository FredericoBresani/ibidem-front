import { Observable } from "rxjs";

export type articleResolverData = {
  articleContent: Observable<JSON>,
  articleInfos: Observable<Article>
};

export interface Article {
    url: string;

    author: string;

    image: string;

    title: string;

    subtitle: string;

    category: string;

    description: string;

    image_description?: string;

    _id?: string;
}
