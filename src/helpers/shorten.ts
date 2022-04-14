export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export const shortenHash = (hash: string): string => {
  return `${hash.substring(0, 4)}...${hash.substring(hash.length - 4)}`
}
