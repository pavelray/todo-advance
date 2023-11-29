export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: {email: $email}) {
            email
            imageUrl
            id
        }
    }
`;

export const createUserMutation = `
mutation CreateUser(
    $input: UserCreateInput!
  ) {
    userCreate(input: $input) {
      user {
        name
        email
        imageUrl
      }
    }
  }
  
`;
