export type confirmationType = 'register' | 'update' | 'recover' | '';

export interface User {
  username: string,

  email: string,

  password: string,

  author: boolean,

  register_date: Date,

  avocados: number,

  temp_email?: string,

  temp_username?: string,

  birth_date?: Date,

  temp_birth_date?: Date,

  new_password?: string,

  confirmation?: confirmationType,

  receive_emails?: boolean,

  temp_receive_emails?: boolean,

  _id?: string,
}
