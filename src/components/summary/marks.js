const computeMark = percent => {
  if (percent < 0.38) return 'F'
  if (percent < 0.60) return 'FX'
  if (percent < 0.65) return 'E'
  if (percent < 0.71) return 'D'
  if (percent < 0.85) return 'C'
  if (percent < 0.95) return 'B'
  return 'A'
}

const getECTSMark = (rate, current, examRate) => {
  if (current <= 0) return ''
  if (examRate !== undefined && examRate < 22) return 'FX'
  return computeMark(rate / current)
}

export default getECTSMark
