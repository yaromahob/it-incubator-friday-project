export const authActions = (auth: {}) => {
  return {
    type: '',
    auth,
  }
}

//types

export type ActionsType = ReturnType<typeof authActions>
