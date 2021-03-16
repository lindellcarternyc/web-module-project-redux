import initialState from './state'

import { 
    ADD_FEATURE, REMOVE_FEATURE
} from './actions'

const getAdditionalPrice = (features) => features.reduce((total, feature) => total + feature.price, 0)

const reducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case ADD_FEATURE: {
            if (state.car.features.find(feature => feature.id === payload.id)) {
                return state
            }
            const additionalFeatures = state.additionalFeatures.filter(feature => feature.id !== payload.id)
            const car = {
                ...state.car,
                features: [...state.car.features, payload]
            }
            const additionalPrice = getAdditionalPrice(car.features)

            return {
                ...state,
                additionalFeatures,
                car,
                additionalPrice
            }
        }

        case REMOVE_FEATURE: {
            const car = {
                ...state.car,
                features: state.car.features.filter(feature => feature.id !== payload.id)
            }
            const additionalPrice = getAdditionalPrice(car.features)
            const additionalFeatures = [...state.additionalFeatures, payload]
            return {
                ...state,
                car,
                additionalFeatures,
                additionalPrice
            }
        }

        default:
            return state
    }
}

export default reducer