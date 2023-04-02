export const standard = defineScenario({
  user: {
    one: {
      data: {
        email: 'String8',
        hashedPassword: 'String',
        fullName: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        email: 'String16',
        hashedPassword: 'String',
        fullName: 'String',
        salt: 'String',
      },
    },
  },
})
