function formatText(str) {
    return str.value.replaceAll('<', '&lt').replaceAll('>', '&gt')
}
export { formatText }
