export function currConverter(price) {
    const convertedPrice = new Intl.NumberFormat('ke-KE', {
        style: 'currency',
        currency: 'KES',
    }).format(price)
    return convertedPrice
}
