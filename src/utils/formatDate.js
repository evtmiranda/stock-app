export default (date) => {
    date = new Date(date)
    return date.toLocaleDateString("pt-BR")
}