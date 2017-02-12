export const LOCATION_UPDATE = 'LOCATION_UPDATE'
export const updateLocation = update => {
  return {
    type: LOCATION_UPDATE,
    payload: {...update}
  }
}

