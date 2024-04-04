export interface Module {
  number: number;

  name: string;

  classes?: string[];

  objective: string;

  duration: number;
}

export interface Course {
  title: string;

  subtitle: string;

  author_id: string;

  image: string;

  image_description: string;

  trailer_link: string;

  course_url: string;

  price: number;

  objective: string;

  details: string[];

  includes: string[];

  for_whom: string[];

  do_it_if: string[];

  answered_questions: string[];

  what_is_needed: string[];

  about_instructor: string[];

  about_methodology: string[];

  modules: Module[];

  _id?: string;

  score?: number;
}
