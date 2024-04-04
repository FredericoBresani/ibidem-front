type navBarOptionsTypes = 'image' | 'text';

type navBarOption = {key: string; type: navBarOptionsTypes; value: string; url: string};

export const navBarOptions: navBarOption[] = [
  { key: 'content', type: 'text', value: 'Conteúdos', url: '/content' },
  { key: 'courses', type: 'text', value: 'Cursos', url: '/courses'},
  { key: 'about us', type: 'text', value: 'Nosso propósito', url: '/purpose'},
  { key: 'instagram logo', type: 'image', value: '/assets/icons/instagramlogo.png', url: 'https://www.instagram.com/grupo.ibidem/?hl=en' },
  { key: 'greeting', type: 'image', value: '/assets/icons/user.svg', url: 'account/login' },
];

