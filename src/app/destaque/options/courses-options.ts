export type CourseOption = {
  image: string;
  url: string;
  short_description: string;
  long_description: string;
  name: string;
  price: string;
}

export const coursesOptions: CourseOption[] = [
  {
    image: '/assets/images/pexels-andrea-piacquadio-927451.jpeg',
    url: '63750aa72d36808bbf4918eb',
    short_description: 'Disciplina, Gestão de Tempo (GTD) e Resultado (OKR)',
    long_description: 'Descubra as melhores técnicas atuais para controlar a procrastinação, ser mais produtivo e gerar resultados eficazes.',
    name: 'Produtividade de A a Z',
    price: '',
  },
  {
    image: '/assets/images/pexels-dan-nelson-3949100.jpeg',
    url: '',
    short_description: 'O Guia Completo de Proteção Online',
    long_description: 'Aprenda as melhores práticas e ferramentas para manter os seus dados e da sua empresa seguros.',
    name: 'Segurança Digital',
    price: '',
  },
  {
    image: '/assets/images/pexels-christina-morillo-1181715.jpeg',
    url: '',
    short_description: 'Aprenda a Ter Conversas Eficazes',
    long_description: 'Saiba como utilizar os elementos que potencializam uma boa comunicação para se expressar melhor e obter conversas eficazes.',
    name: 'Comunicação Assertiva',
    price: '',
  }
]
