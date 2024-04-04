export type sourceType = { link: string; title: string };

export type articleImage = { description: string; file_name: string; source: sourceType };

export interface ArticleHeader {
    read_time: number;
    subtitle: string;
    title: string;
    image: articleImage;
}
