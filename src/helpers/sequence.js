import { RESULT_THRESHOLD_LEVELS } from '../config/vars'

export const createSequence = (NUM_BAR = RESULT_THRESHOLD_LEVELS.NUM_BAR) => {
    const sequence = []
    let LIMITED_BAR = NUM_BAR >= RESULT_THRESHOLD_LEVELS.NUM_BAR ? RESULT_THRESHOLD_LEVELS.NUM_BAR: NUM_BAR
    for (let i = 0; i < LIMITED_BAR; i++){
        sequence.push(i)
    }
    return sequence
}

